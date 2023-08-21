import { Router } from "express";
import { passportCall, authorization, authToken } from "../utils.js";
import {
  login,
  register,
  profile,
  logout,
} from "../controllers/users.views.controller.js";

const router = Router();

router.get("/login", login);

router.get("/register", register);

router.get("/profile", passportCall("jwt"), profile);

router.get("/logout", logout);

export default router;
