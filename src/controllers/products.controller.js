import { productsService } from "../services/services.js";
import MailingService from "../services/email/mailing.js";

export async function getAllProducts(req, res) {
  let limit = req.query.limit;
  let products = await productsService.getProducts(limit);
  res.status(200).send({
    status: "Success",
    message: products,
  });
}

export async function getProductById(req, res) {
  let products = await productsService.getProductById(req.params.pid);
  if (!products) {
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
    let prod = { ...req.body, owner_id: req.user._id };

    // Validaciones de los campos ingresados
    let msgError = validateInput(prod);

    if (msgError.length > 0) {
      return res.status(400).send({ status: "Error", message: msgError });
    }

    // Valido si ya existe ese código para otro producto
    let exist = await productsService.getProductByCode(prod.code);
    if (exist) {
      return res.status(409).send({
        status: "Error",
        message: `El código: ${prod.code} ya se encuentra registrado para otro producto`,
      });
    }

    //Agrego producto
    let product = await productsService.addProduct(prod);

    res.status(201).send({ status: "Success", payload: product });
  } catch (err) {
    console.log("error: " + err);
    res.status(400).send({ status: "Error", error: err });
  }
}

export async function updateProductById(req, res) {
  try {
    let info = req.body;
    let pid = req.params.pid;

    // Busco el producto que se desea actualizar
    let exist = await productsService.getProductById(pid);
    if (!exist) {
      return res.status(409).send({
        status: "Error",
        message: "El id del producto que desea actualizar no se encuentra",
      });
    }

    // Valido que el código del producto que se está actualizando no coincida copn un código ya ingresado para otro producto
    let prodCode = await productsService.getProductByCode(req.body.code);

    if (prodCode && prodCode._id != pid) {
      return res.status(409).send({
        status: "Error",
        message:
          "El código que esta queriendo ingresar ya existe para otro producto",
      });
    } else {
      let products = await productsService.updateProductById(pid, info);
      res.status(200).send({
        status: "Success",
        message: `Se actualizó el producto Id: ${pid}`,
      });
    }
  } catch (err) {
    res.status(400).send({ status: "Error", message: err });
  }
}

export async function deleteProductById(req, res) {
  try {
    // Busco el producto que se desea eliminar
    let exist = await productsService.getProductById(req.params.pid);
    if (!exist) {
      return res.status(409).send({
        status: "Error",
        message: "El id del producto que desea eliminar no se encuentra",
      });
    }

    if (exist.owner_id.role === "premiun") {
      let mailingService = new MailingService();

      /** ENVIO DEL MAIL con la compra*/
      await mailingService.sendMail({
        to: exist.owner_id.email,
        subject: "Producto eliminado",
        html: `<div><h1>Se eliminó su producto </h1>
                      <p><b>Título:</b> ${exist.title}<br> 
                            <b>Descripción:</b> ${exist.description}<br>
                            <b>Código:</b> ${exist.code}
                      </p>
                  </div>`,
        attachments: [],
      });
    }

    let products = await productsService.deleteProductoById(req.params.pid);

    res.status(200).send({
      status: "Success",
      message: `Se eliminó el producto`,
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

function validateInput(data) {
  // Valido que todos los campos sean obligatorios
  let msgError = new Array();
  let { title, description, code, price, status, stock, category } = data;

  if (title === undefined || title === "") {
    msgError.push("El titulo es un campo obligatorio");
  }

  if (description === undefined || description === "") {
    msgError.push("La descripción es un campo obligatorio");
  }

  if (code === undefined || code === "") {
    msgError.push("El código es un campo obligatorio");
  }
  if (price === undefined || price === "") {
    msgError.push("El precio es un campo obligatorio");
  }

  if (status === undefined || status === "") {
    msgError.push("El estado es un campo obligatorio");
  }

  if (stock === undefined || stock === "") {
    msgError.push("El stock es un campo obligatorio");
  }

  if (category === undefined || category === "") {
    msgError.push("La categoria es un campo obligatorio");
  }

  return msgError;
}
