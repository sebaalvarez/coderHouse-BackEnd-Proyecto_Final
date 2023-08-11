import { Router } from "express";
import { passportCall, authorization } from "../utils.js";
import {
  getProductsByCart,
  getProducts,
  getHome,
} from "../controllers/views.controller.js";

const router = Router();

//  passportCall("jwt"),  authorization("user")
// authToken

router.get("/", getHome);

/***  Obtiene Todos los productos y los muestra por navegador  ***/
router.get(
  "/products",
  passportCall("jwt"),
  authorization("user"),
  getProducts
);

/***  Obtiene Todos los productos del Carrito indicado y los muestra por navegador  ***/
// router.get("/carts/:cid", auth, getProductsByCart);
router.get(
  "/carts/:cid",
  passportCall("jwt"),
  authorization("user"),
  getProductsByCart
);

export default router;
