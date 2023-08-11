import mongoose from "mongoose";
import config from "./config.js";

export default class MongoSingleton {
  static #instance;

  constructor() {
    this.#connectMongoDB();
  }

  #connectMongoDB = async () => {
    try {
      await mongoose.connect(config.mongoUrl);
      console.log("Conectado con exito a MongoDB usando Moongose.");
    } catch (error) {
      console.error("No se pudo conectar a la BD usando Moongose: " + error);
      process.exit();
    }
  };

  static getInstance() {
    if (this.#instance) {
      console.log("Ya se ha abierto una conexion a MongoDB.");
    } else {
      this.#instance = new MongoSingleton();
    }
    return this.#instance;
  }
}

export const mongoInstance = async () => {
  try {
    await MongoSingleton.getInstance();
  } catch (error) {
    console.error(error);
  }
};
