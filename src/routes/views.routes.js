import { Router } from "express";
import { passportCall, authorization } from "../utils.js";
import {
  getProductsByCart,
  getProducts,
  getHome,
} from "../controllers/views.controller.js";

const router = Router();

//  passportCall("jwt"),  authorization("user")

router.get("/", getHome);
router.post("/", getHome);

/***  Obtiene Todos los productos y los muestra por navegador  ***/
router.get("/products", passportCall("jwt"), getProducts);

/***  Obtiene Todos los productos del Carrito indicado y los muestra por navegador  ***/
router.get("/carts/:cid", passportCall("jwt"), getProductsByCart);

router.get("/carts/", passportCall("jwt"), getProductsByCart);
export default router;
