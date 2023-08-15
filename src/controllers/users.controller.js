import { usersService, cartsService } from "../services/services.js";

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

export async function ingreso(req, res) {
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
