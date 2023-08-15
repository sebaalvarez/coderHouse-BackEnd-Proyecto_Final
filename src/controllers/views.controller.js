import { cartsService, productsService } from "../services/services.js";

export async function getHome(req, res) {
  res.render("home", {});
}

export async function getProducts(req, res) {
  let limit = req.query.limit;
  let page = req.query.page;
  let sort = req.query.sort;
  let query = req.query.query;

  let user = req.user;

  // console.log(usr);
  // console.log(
  //   `Limite: ${limit} || Pagina: ${page} || Orden: ${sort} || Query: ${query} `
  // );
  let prod = await productsService.getProducts(limit, page, sort, query);

  prod.prevLink = prod.hasPrevPage
    ? `http://localhost:8080/products?page=${prod.prevPage}`
    : "";
  prod.nextLink = prod.hasNextPage
    ? `http://localhost:8080/products?page=${prod.nextPage}`
    : "";
  prod.isValid = !(page <= 0 || page > prod.totalPages);

  // Agrego en el objeto el card_id del usuario logueado para poder obtenerlo en handlebars
  let products = prod.docs.map((p) => (p = { ...p, card_id: user.cart_id }));
  prod.docs = products;

  res.render("products", { ...prod, user });
}

export async function getProductsByCart(req, res) {
  let user = req.user;
  let carts = await cartsService.getCartById(req.params.cid);

  res.render("productsByCart", { ...carts, user });
}

// export function auth(req, res, next) {
//   // console.log(req.session.user);
//   if (req.session.user) {
//     return next();
//   } else {
//     return (
//       res
//         // .status(403)
//         // .send(`El usuario no tiene permisos para ingresar a esta página`)
//         .render("sinAcceso", {})
//     );
//   }
// }
