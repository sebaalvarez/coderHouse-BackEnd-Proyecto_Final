import usersModel from "../models/user.model.js";
import { UsersCreateDto, UsersDto } from "../../../../dto/user.dto.js";

export default class UsersService {
  constructor() {
    // console.log("Working products with Database persistence in mongodb");
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

  // updateUserById = async (id, product) => {
  //   try {
  //     let { _id, ...rest } = product;

  //     let result = await usersModel.updateOne({ _id: id }, rest);

  //     console.log(`El producto id: ${id} fue actualizado correctamente`);
  //     return result;
  //   } catch (err) {
  //     console.error(`ERROR actualizando Producto: ${err}`);
  //   }
  // };

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
