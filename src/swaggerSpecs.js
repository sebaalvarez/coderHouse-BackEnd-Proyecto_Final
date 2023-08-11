import swaggerJsdoc from "swagger-jsdoc";
import { _dirname } from "./utils.js";

const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentación del Proyecto",
      description: "Doocumentación de los endpoint ",
    },
  },
  // aqui van a estar todas las especificaciones tecnicas de mis apis
  apis: [`${_dirname}/docs/**/*.yaml`],
};

export const swaggerSpecs = swaggerJsdoc(options);
