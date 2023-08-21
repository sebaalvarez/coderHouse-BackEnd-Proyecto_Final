import { usersService, cartsService } from "../services/services.js";
import MailingService from "../services/email/mailing.js";

export async function getAllUsers(req, res) {
  try {
    let users = await usersService.getAllUsers();
    res.status(200).send({
      status: "Success",
      message: users,
    });
  } catch (err) {
    return res.status(400).send({ status: "Error", message: err });
  }
}

export async function login(req, res) {
  const userId = req.params.userId;
  try {
    const user = await usersService.getUserById(userId);
    if (!user) {
      res.status(202).json({ message: "User not found with ID: " + userId });
    }
    res.json(user);
  } catch (error) {
    console.error("Error consultando el usuario con ID: " + userId);
  }
}

export async function createUser(req, res) {
  try {
    // Valido que ya no exista el mail registrado para otro usuario
    const userExist = await usersService.getUserByEMail(req.body.email);

    if (userExist) {
      return res.status(409).send({
        status: "Error",
        message: "El mail ingresado ya se encuentra registrado",
      });
    }

    let user = await usersService.createUser(req.body);

    let createCart = await cartsService.addCart();

    await usersService.updateUserById(user._id, {
      cart_id: createCart._id,
    });

    return res.status(201).send({ status: "Success", payload: user });
  } catch (err) {
    return res.status(400).send({ status: "Error", message: err });
  }
}

export async function deleteUsersInactivos(req, res) {
  try {
    // obtengo todos los usuarios inactivos, en el dao de usuarios tiene configurado el tiempo de inactividad a filtrar
    let users = await usersService.getAllUsersInactivos();
    res.status(200).send({
      status: "Success",
      message: users,
    });
    const mailingService = new MailingService();

    for (const obj of users) {
      // Elimino carrito
      await cartsService.deleteCartById(obj.cart_id);

      // Elimino usuario
      await usersService.deleteUserById(obj._id);

      /** ENVIO DEL MAIL con la compra*/
      await mailingService.sendMail({
        to: obj.email,
        subject: "Su cuenta fue eliminada por falta de actividad",
        html: `<div><h1>Se eliminó su cuenta por falta de actividad</h1></div>`,
        attachments: [],
      });
    }
  } catch (err) {
    return res.status(400).send({ status: "Error", message: err });
  }
}
