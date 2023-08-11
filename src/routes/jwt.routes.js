import { Router } from "express";
import { ingreso } from "../controllers/jwt.controller.js";

const router = Router();

router.post("/login", ingreso);

export default router;
