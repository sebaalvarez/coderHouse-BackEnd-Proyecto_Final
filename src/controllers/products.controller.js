// import path from "path";
// import ProductManager from "../services/dao/filesystem/services/productManager.js";
import ProductService from "../services/dao/db/services/products.service.js";
// const pm = new ProductManager(path.join(".", "files"));
const pm = new ProductService();

export async function getAllProducts(req, res) {
  let limit = req.query.limit;
  let products = await pm.getProducts(limit);
  res.status(200).send({
    status: "Success",
    message: products,
  });
}

export async function getProductById(req, res) {
  let products = await pm.getProductById(req.params.pid);

  if (products.length === 0) {
    res.status(202).send({
      status: "info",
      error: `No se encontró el producto con ID: ${req.params.pid}`,
    });
  } else {
    res.status(200).send({ status: "Success", message: products });
  }
}

export async function addProduct(req, res) {
  try {
    let product = await pm.addProduct(req.body);

    /****  VALIDAR SI SE CARGO O NO EL PRODUCTO */
    res.status(201).send({ status: "Success", payload: product });
  } catch (err) {
    res.status(400).send({ status: "Error", error: err });
  }
}

export async function updateProductById(req, res) {
  try {
    let info = req.body;
    let pid = req.params.pid;
    let products = await pm.updateProductById(pid, info);
    res.status(200).send({
      status: "Success",
      message: `Se actualizó el producto Id: ${pid}`,
    });
  } catch (err) {
    res.status(400).send({ status: "Error", message: err });
  }
}

export async function deleteProductById(req, res) {
  try {
    let products = await pm.deleteProductoById(req.params.pid);
    res.status(200).send({
      status: "Success",
      message: `Se eliminó el producto ID: ${req.params.pid}`,
    });
  } catch (err) {
    res.status(400).send({ status: "Error", message: err });
  }
}

// export function auth(req, res, next) {
//   // console.log(req.session.user);
//   if (req.session.user && req.session.user.role == "admin") {
//     return next();
//   } else {
//     return (
//       res
//         .status(403)
//         // .send(`El usuario no tiene permisos para ingresar a esta página`)
//         .render("sinAcceso", {})
//     );
//   }
// }
