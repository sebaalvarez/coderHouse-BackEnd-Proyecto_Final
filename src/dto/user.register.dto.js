import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";
import {
  first_nameDTOSchema,
  last_nameDTOSchema,
  emailDTOSchema,
  passwordDTOSchema,
} from "./user.dto.js";

const RegisterDTOSchema = Type.Object(
  {
    first_name: first_nameDTOSchema,
    last_name: last_nameDTOSchema,
    email: emailDTOSchema,
    password: passwordDTOSchema,
    age: Type.String({
      errorMessage: {
        type: "El tipo no es correcto, debe ser un String",
      },
    }),
    role: Type.String({}),
  }
  // Para no permitir que me ingresen propiedades extras en el objeto
  // {
  //   additionalProperties: false,
  //   errorMessage: {
  //     additionalProperties:
  //       " No se pueden ingresar más propiedades del objeto que las solicitadas",
  //   },
  // }
);

const ajv = new Ajv({ allErrors: true })
  .addKeyword("kind")
  .addKeyword("modifier");

ajv.addFormat("password", /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);

addFormats(ajv, ["email"]);
addErrors(ajv);

const validateSchema = ajv.compile(RegisterDTOSchema);

const userRegisterDTO = (req, res, next) => {
  const isValidate = validateSchema(req.body);

  if (!isValidate)
    return res.status(400).send({
      status: "Error",
      mensaje: validateSchema.errors.map((err) => err.message),
    });
  // .send(ajv.errorsText(validateSchema.errors, { separator: "\n" }));
  next();
};

export default userRegisterDTO;
