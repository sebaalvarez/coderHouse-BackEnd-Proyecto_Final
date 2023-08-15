import passport from "passport";
import passportLocal from "passport-local";
import GitHubStrategy from "passport-github2";
import jwtStrategy from "passport-jwt";

import { isValidPassword, PRIVATE_KEY } from "../utils.js";
import { usersService, cartsService } from "../services/services.js";

// Declaramos nuestra estrategia
const localStrategy = passportLocal.Strategy;

const JwtStrategy = jwtStrategy.Strategy;
const ExtractJWT = jwtStrategy.ExtractJwt;

const initializePassport = () => {
  // estrategia github
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "Iv1.bc4e6f077f696103",
        clientSecret: "c43d8c2f983b4acaec95e892d4a5a57c2a7e70cd",
        callbackUrl: "http://localhost:9090/api/sessions/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await usersService.getUserByEMail(profile._json.email);

          if (!user) {
            let newUser = {
              first_name: profile._json.name,
              last_name: "",
              age: 18,
              email: profile._json.email,
              password: "",
              loggedBy: "GitHub",
            };
            createUser;
            const result = await usersService.createUser(newUser);
            return done(null, result);
          } else {
            return done(null, user);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  //Estrategia JWT por Cookie:
  passport.use(
    "jwt",
    new JwtStrategy(
      // extraer la  cookie
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY,
      },
      // Ambiente Async
      async (jwt_payload, done) => {
        console.log("Entrando a passport Strategy con JWT.");
        try {
          // console.log("JWT obtenido del payload");
          // console.log(jwt_payload);
          return done(null, jwt_payload.user);
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );

  // estrategia register
  passport.use(
    "register",
    new localStrategy(
      // passReqToCallback: para convertirlo en un callback de request, para asi poder iteracturar con la data que viene del cliente
      // usernameField: renombramos el username
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        try {
          const userExist = await usersService.getUserByEMail(req.body.email);

          if (userExist) {
            console.log("El usuario ya existe.");
            return done(null, false);
          }

          const user = await usersService.createUser(req.body);

          let createCart = await cartsService.addCart();

          await usersService.updateUserById(user._id, {
            cart_id: createCart._id,
          });
          return done(null, user);
        } catch (error) {
          console.error("Error registrando el usuario: " + error);
          return done(null, false);
        }
      }
    )
  );

  // estrategia login
  passport.use(
    "login",
    new localStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        try {
          const user = await usersService.getUserByEMail(username);

          if (!user) {
            console.warn("Invalid credentials for user: " + username);
            return done(null, false);
          }
          if (!isValidPassword(user, password)) {
            console.warn("Invalid credentials for user: " + username);
            return done(null, false);
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // estrategia current
  passport.use(
    "current",
    new localStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        try {
          const user = await usersService.getUserByEMail(username);

          if (!user) {
            console.warn("Invalid credentials for user: " + username);
            return done(null, false);
          }

          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  //Funciones de Serializacion y Desserializacion
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await usersService.getUserById(id);
      done(null, user);
    } catch (error) {
      console.error("Error deserializando el usuario: " + error);
    }
  });
};

// Funcion para hacer la extraccion del token de la cookie
const cookieExtractor = (req) => {
  let token = null;
  // console.log("Entrando a cookie extractor");
  if (req && req.cookies) {
    //Validamos que exista el request y las cookies.
    // console.log("Cooikies presentes!");
    // console.log(req.cookies);
    token = req.cookies["jwtCookieToken"];
    // console.log("token obtenido desde cookie");
    // console.log(token);
  }
  return token;
};

export default initializePassport;
