// import path from "path";
// import CartManager from "../services/dao/filesystem/services/cartManager.js";
// import ProductManager from "../services/dao/filesystem/services/productManager.js";
import CartService from "../services/dao/db/services/carts.service.js";
import ProductService from "../services/dao/db/services/products.service.js";
import TicketService from "../services/dao/db/services/ticket.service.js";

// const car = new CartManager(path.join(".", "files"));
const car = new CartService();
const pm = new ProductService();
const ticket = new TicketService();

export async function createCart(req, res) {
  await car.addCart();
  res.status(200).send({
    status: "Success",
    message: `Se cargo el carrito`,
  });
}

export async function getAllCarts(req, res) {
  let carts = await car.getCarts();
  let limit = req.query.limit;

  res.status(200).send({
    status: "Success",
    message: !limit ? carts : carts.slice(0, limit),
  });
}

export async function getCartById(req, res) {
  let carts = await car.getCartById(req.params.cid);

  if (carts.length === 0) {
    res.status(202).send({
      status: "info",
      error: `No se encontró el carrito con ID: ${req.params.cid}`,
    });
  } else {
    res.status(200).send({ status: "Success", message: carts });
  }
}

export async function addProductInCartById(req, res) {
  let cid = req.params.cid;
  let pid = req.params.pid;

  let carts = await car.getCartById(cid);

  /* Verifico si existe el id del carrito */
  if (carts.length === 0) {
    res.status(202).send({
      status: "info",
      error: `No se encontró el carrito con Id: ${cid}`,
    });
  } else {
    let product = await new ProductService().getProductById(pid);
    /* Verifico si existe el id del producto en el maestro de productos  */
    if (product.length === 0) {
      res.status(202).send({
        status: "info",
        error: `Se encontró carrito con ID: ${cid} pero No se encontró el producto con Id: ${pid}`,
      });
    } else {
      /* Existe el id del carrito y el id del producto en el maestro de productos */
      car.addProductCar(cid, pid);

      res.status(200).send({
        status: "Success",
        message: `Se agrego-actualizó el producto Id: ${pid} en el carrito con Id: ${cid}`,
      });
    }
  }
}

export async function addPurchaseByCartById(req, res) {
  let cid = req.params.cid;
  try {
    let carts = await car.getCartById(cid);

    /* Verifico si existe el id del carrito */
    if (carts.length === 0) {
      res.status(202).send({
        status: "info",
        error: `No se encontró el carrito con Id: ${cid}`,
      });
    } else {
      let sum = 0;
      let purchaseOkArry = [];
      let purchaseFailArry = [];
      for (const obj of carts.products) {
        // Valido si el producto tiene mas stock que el pedido
        if (obj.quantity <= obj.product.stock) {
          sum += obj.quantity * obj.product.price;

          // Actualizo cantidad de Stock restando la cantidad del pedido
          let info = {
            stock: obj.product.stock - obj.quantity,
          };
          await pm.updateProductById(obj.product._id.toString(), info);

          // Agrego al array de productos comprados
          purchaseOkArry.push(obj.product._id.toString());
        } else {
          // Agrego al array de productos no comprados
          purchaseFailArry.push(obj.product.title);
        }
      }

      // elimino del carrito los productos que se agregaron al ticket
      for (const obj of purchaseOkArry) {
        await car.deleteProductById(cid, obj);
      }
      if (purchaseOkArry.length != 0) {
        let compra = {
          code: "Compra Nº" + new Date().getTime(),
          purchaser: "mail@gmail.com",
          amount: sum,
        };

        ticket.addTicket(compra);
        res.status(200).send({
          status: "Success",
          message: `Se actualizó en el carrito con Id: ${cid} `,
          payload: `Los siguientes productos no se pudieron comprar por falta de Stock: ${purchaseFailArry}`,
        });
      } else {
        res.status(200).send({
          status: "Success",
          message: `No se pudo realizar la compra del carrito con Id: ${cid} `,
          payload: `Los siguientes productos no se pudieron comprar por falta de Stock: ${purchaseFailArry}`,
        });
      }
    }
  } catch (error) {
    res.status(400).send({
      status: "Error",
      message: `No se pudo realizar la compra del carrito con Id: ${cid} `,
    });
  }
}

export async function deleteAllProducts(req, res) {
  let carts = await car.deleteProducts(req.params.cid);

  if (carts.length === 0) {
    res.status(202).send({
      status: "info",
      error: `No se encontró el carrito con ID: ${req.params.cid}`,
    });
  } else {
    res.status(200).send({ status: "Success", message: carts });
  }
}

export async function deleteProductByIdCartId(req, res) {
  let cid = req.params.cid;
  let pid = req.params.pid;

  let carts = await car.deleteProductById(cid, pid);

  if (carts.length === 0) {
    res.status(202).send({
      status: "info",
      error: `No se encontró el carrito con ID: ${req.params.cid}`,
    });
  } else {
    res.status(200).send({ status: "Success", message: carts });
  }
}

export async function updateQuantityProductById(req, res) {
  let cid = req.params.cid;
  let pid = req.params.pid;
  let qty = req.body.quantity;

  let carts = await car.getCartById(cid);

  /* Verifico si existe el id del carrito */
  if (carts.length === 0) {
    res.status(202).send({
      status: "info",
      error: `No se encontró el carrito con Id: ${cid}`,
    });
  } else {
    let product = await new ProductService().getProductById(pid);
    /* Verifico si existe el id del producto en el maestro de productos  */
    if (product.length === 0) {
      res.status(202).send({
        status: "info",
        error: `Se encontró carrito con ID: ${cid} pero No se encontró el producto con Id: ${pid}`,
      });
    } else {
      /* Existe el id del carrito y el id del producto en el maestro de productos */
      car.updateQuantityProduct(cid, pid, qty);

      res.status(200).send({
        status: "Success",
        message: `Se actualizó el producto Id: ${pid} en el carrito con Id: ${cid}`,
      });
    }
  }
}

export async function addProductsByArray(req, res) {
  let cid = req.params.cid;
  let arr = req.body;

  let carts = await car.getCartById(cid);

  /* Verifico si existe el id del carrito */
  if (carts.length === 0) {
    res.status(202).send({
      status: "info",
      error: `No se encontró el carrito con Id: ${cid}`,
    });
  } else {
    car.updateProductByArray(cid, arr);
    res.status(200).send({
      status: "Success",
      message: `Se actualizó  el carrito con Id: ${cid}`,
    });
  }
}
