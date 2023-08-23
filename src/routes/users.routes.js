import { Router } from "express";
import { passportCall, authorization } from "../utils.js";
import {
  login,
  createUser,
  getAllUsers,
  deleteUsersInactivos,
  deleteUsersById,
  editUsersById,
  updateUserById,
} from "../controllers/users.controller.js";
import userRegisterDTO from "../dto/user.register.dto.js";

const router = Router();

router.get("/", getAllUsers);

router.post("/register", userRegisterDTO, createUser);

router.get("/:userId", login);

router.delete("/delete", deleteUsersInactivos);

router.get(
  "/delete/:userId",
  passportCall("jwt"),
  authorization("admin"),
  deleteUsersById
);

router.get(
  "/edit/:userId",
  passportCall("jwt"),
  authorization("admin"),
  editUsersById
);

router.post(
  "/edit/:userId",
  passportCall("jwt"),
  authorization("admin"),
  updateUserById
);
// router.get("/", authToken, getAllUsers);

// router.get("/:userId", authToken, ingreso);

export default router;
