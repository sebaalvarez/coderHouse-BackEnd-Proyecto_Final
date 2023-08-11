import { Router } from "express";

import { getProductsMock } from "../controllers/mocking.controller.js";

const router = Router();

router.get("/", getProductsMock);

export default router;
