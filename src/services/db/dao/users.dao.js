import usersModel from "../models/user.model.js";
import { UsersCreateDto, UsersDto } from "../../../dto/user.dto.js";
import mongoose from "mongoose";

export default class UsersDao {
  constructor() {
    console.log("Working users with Database persistence in mongodb");
  }

  createUser = async (userData) => {
    try {
      const newUser = new UsersCreateDto(userData);
      let result = await usersModel.create(newUser);
      return result;
    } catch (err) {
      console.error(`ERROR creando Usuario: ${err}`);
      return result;
    }
  };

  getAllUsers = async () => {
    try {
      let prod = await usersModel.find();
      // paso el array de usuarios por el DTO de usuarios para devolver solamente los campos necesarios
      const newArryUser = [];
      for (const obj of prod) {
        newArryUser.push(new UsersDto(obj));
      }
      // console.log(newArryUser);
      return newArryUser;
    } catch (err) {
      console.error(`ERROR obteniendo los Usuarios: ${err}`);
      return [];
    }
  };

  getUserById = async (id) => {
    try {
      let courses = await usersModel.findOne({ _id: id });

      return courses;
    } catch (err) {
      console.error(`ERROR obteniendo el Usuario por ID: ${err}`);
      return [];
    }
  };

  getUserByEMail = async (mail) => {
    try {
      let courses = await usersModel.findOne({ email: mail });
      return courses;
    } catch (err) {
      console.error(`ERROR obteniendo el Usuario por Mail: ${err}`);
      return [];
    }
  };

  updateUserById = async (id, user) => {
    try {
      let { _id, ...rest } = user;
      if (mongoose.Types.ObjectId.isValid(id)) {
        let result = await usersModel.updateOne({ _id: id }, rest);

        // console.log(`El usuario id: ${id} fue actualizado correctamente`);
        return result;
      } else {
        return null;
      }
    } catch (err) {
      console.error(`ERROR actualizando el Usuario: ${err}`);
      return null;
    }
  };

  // deleteUserById = async (id) => {
  //   let msg = "";
  //   try {
  //     let result = await usersModel.deleteOne({ _id: id });
  //     console.log(`Se cargo el producto ${result}`);
  //   } catch (err) {
  //     msg = `ERROR borrando Producto por ID: ${err}`;
  //   } finally {
  //     console.log(msg);
  //   }
  // };
}
