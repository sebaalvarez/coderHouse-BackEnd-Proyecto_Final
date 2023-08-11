import { Router } from "express";
import {
  createCart,
  getAllCarts,
  getCartById,
  addProductInCartById,
  deleteAllProducts,
  deleteProductByIdCartId,
  updateQuantityProductById,
  addProductsByArray,
  addPurchaseByCartById,
} from "../controllers/carts.controller.js";

const router = Router();

/***   Carga carrito ***/
router.post("/", createCart);

/***   Obtiene Todos los carritos ***/
router.get("/", getAllCarts);

/***   Obtiene carrito por ID ***/
router.get("/:cid", getCartById);

/***   Cargo Producto en Carrito ID ***/
router.post("/:cid/products/:pid", addProductInCartById);

/***   Realizo la compra del Carrito ID ***/
router.post("/:cid/purchase", addPurchaseByCartById);

/***    Borro todos los productos del carrito  ***/
router.delete("/:cid", deleteAllProducts);

/***    Borro del carrito el producto indicado   ***/
router.delete("/:cid/products/:pid", deleteProductByIdCartId);

/***   Actualizo la cantidad de un producto pasandole por el body ***/
router.put("/:cid/product/:pid", updateQuantityProductById);

/***   Agrego productos desde un array por el body  ***/
router.put("/:cid", addProductsByArray);

export default router;
