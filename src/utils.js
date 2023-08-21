import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import { faker } from "@faker-js/faker";
import config from "./config/config.js";
import { v4 as uuidv4 } from "uuid";

const _filename = fileURLToPath(import.meta.url);
export const _dirname = dirname(_filename);

faker.locale = "es"; //Idioma de los datos

export const generate_uuidV4 = () => {
  return uuidv4();
};

export const generateProduct = () => {
  return {
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    stock: faker.random.numeric(1),
    id: faker.database.mongodbObjectId(),
    thumbnail: faker.image.image(),
    status: "true",
    category: "cosmetic",
    code: faker.random.alphaNumeric(8),
  };
};

// export const generateProducts = () => {
// let numOfProducts = parseInt(
//   faker.random.numeric(1, { bannedDigits: ["0"] })
// );
// let products = [];
// for (let i = 0; i < numOfProducts; i++) {
//   products.push(generateProduct());
// }
//   return {
//     name: faker.name.firstName(),
//     last_name: faker.name.lastName(),
//     sex: faker.name.sex(),
//     birthDate: faker.date.birthdate(),
//     products,
//     image: faker.internet.avatar(),
//     id: faker.database.mongodbObjectId(),
//     email: faker.internet.email(),
//   };
// };

// 1er - generamos el  HASH
export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// validamos la contraseña con la que esta en la DB como hash
export const isValidPassword = (user, password) => {
  // console.log(
  //   `Datos a validar: user-password: ${user.password}, password: ${password}`
  // );
  return bcrypt.compareSync(password, user.password);
};

export function authSession(req, res, next) {
  // console.log(req.session.user);
  if (req.session.user && req.session.user.role == "admin") {
    return next();
  } else {
    return (
      res
        .status(403)
        // .send(`El usuario no tiene permisos para ingresar a esta página`)
        .render("sinAcceso", {})
    );
  }
}

//JSON Web Tokens JWT functinos:
export const PRIVATE_KEY = config.PrivateKeyJWT;

export const generateJWToken = (user) => {
  return jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "1h" });
};

/**
 * Metodo que autentica el token JWT para nuestros requests.
 * OJO: Esto actúa como un middleware, observar el next.
 * @param {*} req Objeto de request
 * @param {*} res Objeto de response
 * @param {*} next Pasar al siguiente evento.
 */
export const authToken = (req, res, next) => {
  //  El JWT se guarda en los headers de auth
  const authHeader = req.headers.authorization;
  // console.log("Token present in header auth:");
  // console.log(authHeader);

  if (!authHeader) {
    return res
      .status(401)
      .send({ error: "User not authenticated or missing token." });
  }

  //Se hace el split para retirar la palabra Bearer.
  const token = authHeader.split(" ")[1];

  //Validar token
  jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
    if (error)
      return res.status(403).send({ error: "Token invalid, Unauthorized!" });
    //Token OK
    req.user = credentials.user;
    // console.log(req.user);
    next();
  });
};

// Llamada a Passport de acuerdo al Strategy pasado como parámetro
export const passportCall = (strategy) => {
  return async (req, res, next) => {
    console.log("Entrando a llamar strategy: " + strategy);

    passport.authenticate(strategy, function (err, user, info) {
      if (err) return next(err);

      if (!user) {
        return res.status(401).send({
          error: info.messages ? info.messages : info.toString(),
        });

        // return res.render("sinAcceso", {});
      }
      console.log("Usuario obtenido del strategy: " + strategy);
      // console.log(user);
      req.user = user;
      next();
    })(req, res, next);
  };
};

// Manejo de Autorización de acuerdo al rol
export const authorization = (role) => {
  return async (req, res, next) => {
    if (!req.user)
      return res.status(401).send("Unauthorized: User not found in JWT");
    if (req.user.role !== role) {
      return res
        .status(403)
        .send("Forbidden: El usuario no tiene permisos con este rol.");
    }
    next();
  };
};
