import { Type } from "@sinclair/typebox";
import { createHash } from "../utils.js";

export class UsersDto {
  constructor(user) {
    this.fullName = user.first_name + " " + user.last_name;
    this.email = user.email;
    this.role = user.role;
  }
}

export class UsersCreateDto {
  constructor(user) {
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.age = user.age;
    this.role = user.role;
    this.password = createHash(user.password);
  }
}

export const first_nameDTOSchema = Type.String({
  minLength: 2,
  maxLength: 50,
  errorMessage: {
    type: "El tipo no es correcto, debe ser un String",
    minLength: "El nombre debe tener al menos 2 caracteres",
    maxLength: "El nombre no debe tener más de 50 caractteres",
  },
});

export const last_nameDTOSchema = Type.String({
  minLength: 2,
  maxLength: 50,
  errorMessage: {
    type: "El tipo no es correcto, debe ser un String",
    minLength: "El apellido debe tener al menos 2 caracteres",
    maxLength: "El apellido no debe tener más de 50 caractteres",
  },
});

export const emailDTOSchema = Type.String({
  format: "email",
  errorMessage: {
    type: "El tipo no es correcto, debe ser un String",
    format: "El formato del email no es válido debe contener nombre@dominio",
  },
});

export const passwordDTOSchema = Type.String({
  format: "password",
  minLength: 4,
  maxLength: 20,
  errorMessage: {
    type: "El tipo no es correcto, debe ser un String",
    format:
      "El formato de la contraseña no es válido debe contener al menos 1 mayuscula, 1 minúscula y 1 número",
    minLength: "La contraseña debe tener al menos 4 caracteres",
    maxLength: "La contraseña  no debe tener más de 20 caractteres",
  },
});
