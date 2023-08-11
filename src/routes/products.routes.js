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
//  passportCall("jwt"),  authorization("user")
// authToken
router.get("/", getAllProducts);

/***   Obtiene producto por ID ***/
router.get("/:pid", getProductById);

/***   Carga producto ***/
router.post("/", addProduct);
// router.post("/", authSession, addProduct);

/*** Actualiza producto por ID ***/
router.put("/:pid", updateProductById);
// router.put("/:pid", authSession, updateProductById);

/***   Elimina producto por ID ***/
router.delete("/:pid", deleteProductById);
// router.delete("/:pid", authSession, deleteProductById);

export default router;
