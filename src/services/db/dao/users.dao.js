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

  getAllUsersInactivos = async () => {
    try {
      const date = new Date();
      // busco los usuarios que llevan más de 2 días sin loguearse
      // date.setDate(date.getDate() - 2);

      // busco los usuarios que llevan más de 30 minutos sin loguearse
      date.setMinutes(date.getMinutes() - 30);

      let prod = await usersModel.find({
        last_session: { $gte: "1901-01-01", $lte: date },
      });

      // paso el array de usuarios por el DTO de usuarios para devolver solamente los campos necesarios
      const newArryUser = [];
      for (const obj of prod) {
        newArryUser.push(obj);
      }

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

  getUserByCartId = async (cart_id) => {
    try {
      let courses = await usersModel.findOne({ cart_id: cart_id });
      return courses;
    } catch (err) {
      console.error(`ERROR obteniendo el Usuario por cart_id: ${err}`);
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

  deleteUserById = async (id) => {
    let msg = "";
    try {
      let result = await usersModel.deleteOne({ _id: id });
      // console.log(`Se eliminó el usuario`);
    } catch (err) {
      console.log(`ERROR borrando el usuario por ID: ${err}`);
    }
  };
}
