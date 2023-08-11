import { Router } from "express";
import { passportCall, authorization, authToken } from "../utils.js";
import {
  login,
  register,
  profile,
} from "../controllers/users.views.controller.js";

const router = Router();

router.get("/login", login);

router.get("/register", register);

router.get(
  "/",
  passportCall("jwt"), //-> Usando JWT por Cookie usando customCall
  authorization("user"),
  profile
);

export default router;
