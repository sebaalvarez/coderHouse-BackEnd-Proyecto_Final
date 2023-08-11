import { Router } from "express";
import { authToken } from "../utils.js";
import {
  ingreso,
  createUser,
  getAllUsers,
} from "../controllers/users.controller.js";
import userRegisterDTO from "../dto/user.register.dto.js";

const router = Router();

router.get("/", getAllUsers);

router.post("/register", userRegisterDTO, createUser);

router.get("/:userId", ingreso);

// router.get("/", authToken, getAllUsers);

// router.get("/:userId", authToken, ingreso);

export default router;
