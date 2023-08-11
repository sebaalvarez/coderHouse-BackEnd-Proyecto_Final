import UserService from "../services/dao/db/services/users.service.js";

const pm = new UserService();

export async function getAllUsers(req, res) {
  try {
    let users = await pm.getAllUsers();
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
    const user = await pm.getUserById(userId);
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
    const userExist = await pm.getUserByEMail(req.body.email);

    if (userExist) {
      return res.status(409).send({
        status: "Error",
        message: "El mail ingresado ya se encuentra registrado",
      });
    }

    let user = await pm.createUser(req.body);

    return res.status(201).send({ status: "Success", payload: user });
  } catch (err) {
    return res.status(400).send({ status: "Error", message: err });
  }
}
