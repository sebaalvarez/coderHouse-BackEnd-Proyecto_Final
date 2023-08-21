import { Router } from "express";

import {
  authToken,
  authSession,
  passportCall,
  authorization,
} from "../utils.js";

import {
  getAllProducts,
  getProductById,
  addProduct,
  updateProductById,
  deleteProductById,
} from "../controllers/products.controller.js";

const router = Router();

/***   Obtiene Todos los productos ***/
router.get("/", getAllProducts);

/***   Obtiene producto por ID ***/
router.get("/:pid", getProductById);

/***   Carga producto ***/
router.post("/", passportCall("jwt"), authorization("admin"), addProduct);

/*** Actualiza producto por ID ***/
router.put(
  "/:pid",
  passportCall("jwt"),
  authorization("admin"),
  updateProductById
);

/***   Elimina producto por ID ***/
router.delete(
  "/:pid",
  passportCall("jwt"),
  authorization("admin"),
  deleteProductById
);

export default router;
