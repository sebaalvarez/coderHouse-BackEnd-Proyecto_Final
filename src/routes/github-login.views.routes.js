import { Router } from "express";
import {
  login,
  user,
  error,
} from "../controllers/github-login.views.controller.js";

const router = Router();

router.get("/login", login);

router.get("/", user);

router.get("/error", error);

export default router;
