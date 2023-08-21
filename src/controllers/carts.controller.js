import { generate_uuidV4 } from "../utils.js";
import {
  cartsService,
  productsService,
  ticketsService,
  usersService,
} from "../services/services.js";
import MailingService from "../services/email/mailing.js";

export async function createCart(req, res) {
  await cartsService.addCart();
  res.status(200).send({
    status: "Success",
    message: `Se cargo el carrito`,
  });
}

export async function getAllCarts(req, res) {
  let carts = await cartsService.getCarts();
  let limit = req.query.limit;

  res.status(200).send({
    status: "Success",
    message: !limit ? carts : carts.slice(0, limit),
  });
}

export async function getCartById(req, res) {
  let carts = await cartsService.getCartById(req.params.cid);

  if (!carts) {
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
  try {
    let carts = await cartsService.getCartById(cid);

    /* Verifico si existe el id del carrito */
    if (!carts) {
      res.status(202).send({
        status: "info",
        error: `No se encontró el carrito con Id: ${cid}`,
      });
    } else {
      let product = await productsService.getProductById(pid);
      /* Verifico si existe el id del producto en el maestro de productos  */
      if (!product) {
        res.status(202).send({
          status: "info",
          error: `Se encontró carrito con ID: ${cid} pero No se encontró el producto con Id: ${pid}`,
        });
      } else {
        /* Existe el id del carrito y el id del producto en el maestro de productos */
        await cartsService.addProductCar(cid, pid);

        // res.status(200).send({
        //   status: "Success",
        //   message: `Se agrego-actualizó el producto Id: ${pid} en el carrito con Id: ${cid}`,
        // });

        res.redirect("/products");
      }
    }
  } catch (error) {
    console.log("ERROR: No se pudo agregar el producto al carrito");
    res.status(200).send({
      status: "Error",
      message: `No ee agrego-actualizó el producto Id: ${pid} en el carrito con Id: ${cid}`,
    });
  }
}

export async function deleteAllProducts(req, res) {
  let carts = await cartsService.deleteProducts(req.params.cid);

  if (!carts) {
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

  let carts = await cartsService.deleteProductById(cid, pid);

  if (!carts) {
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

  let carts = await cartsService.getCartById(cid);

  /* Verifico si existe el id del carrito */
  if (!carts) {
    res.status(202).send({
      status: "info",
      error: `No se encontró el carrito con Id: ${cid}`,
    });
  } else {
    let product = await productsService.getProductById(pid);
    /* Verifico si existe el id del producto en el maestro de productos  */
    if (!product) {
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

  let carts = await cartsService.getCartById(cid);

  /* Verifico si existe el id del carrito */
  if (!carts) {
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

export async function addPurchaseByCartById(req, res) {
  let cid = req.params.cid;
  try {
    /* Verifico si existe el id del carrito */
    let carts = await cartsService.getCartById(cid);

    if (!carts) {
      res.status(202).send({
        status: "info",
        error: `No se encontró el carrito con Id: ${cid}`,
      });
    } else {
      /* Verifico si el carrito tiene un usuario asociado */
      let user = await usersService.getUserByCartId(cid);

      if (!user) {
        res.status(202).send({
          status: "info",
          error: `No se encontró el  usuario asociado al carrito con Id: ${cid}`,
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
            await productsService.updateProductById(
              obj.product._id.toString(),
              info
            );

            // Agrego al array de productos comprados
            purchaseOkArry.push(obj.product._id.toString());
          } else {
            // Agrego al array de productos no comprados
            purchaseFailArry.push(obj.product.title);
          }
        }

        // elimino del carrito los productos que se agregaron al ticket
        for (const obj of purchaseOkArry) {
          await cartsService.deleteProductById(cid, obj);
        }
        if (purchaseOkArry.length != 0) {
          let compra = {
            code: generate_uuidV4(),
            purchaser: user.email,
            amount: sum,
          };

          let ticket = await ticketsService.addTicket(compra);

          const mailingService = new MailingService();
          /** ENVIO DEL MAIL con la compra*/
          await mailingService.sendMail({
            to: user.email,
            subject: "Gracias por su compra",
            html: `<div><h1>Se realizó la siguiente compar</h1>
            <h2>Ticket Nº: ${compra.code} </h2> <br> 
            <p>Total: $ ${compra.amount}</p></div>`,
            attachments: [],
          });

          // res
          //   .status(200)
          // .send({
          //   status: "Success",
          //   message: `Se actualizó en el carrito con Id: ${cid} `,
          //   payload: `Los siguientes productos no se pudieron comprar por falta de Stock: ${purchaseFailArry}`,
          // })
          res.render("ticket", {});
        } else {
          res.status(200).send({
            status: "Error",
            message: `No se pudo realizar la compra del carrito con Id: ${cid} `,
            payload: `Los siguientes productos no se pudieron comprar por falta de Stock: ${purchaseFailArry}`,
          });
        }
      }
    }
  } catch (error) {
    res.status(400).send({
      status: "Error",
      message: `No se pudo realizar la compra del carrito con Id: ${cid} `,
    });
  }
}
