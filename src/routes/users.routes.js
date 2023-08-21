import { Router } from "express";
import { authToken } from "../utils.js";
import {
  login,
  createUser,
  getAllUsers,
  deleteUsersInactivos,
} from "../controllers/users.controller.js";
import userRegisterDTO from "../dto/user.register.dto.js";

const router = Router();

router.get("/", getAllUsers);

router.post("/register", userRegisterDTO, createUser);

router.get("/:userId", login);

router.delete("/delete", deleteUsersInactivos);

// router.get("/", authToken, getAllUsers);

// router.get("/:userId", authToken, ingreso);

export default router;
