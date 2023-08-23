import {
  cartsService,
  productsService,
  usersService,
} from "../services/services.js";

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
  // console.log(prod);
  res.render("products", { ...prod, user });
}

export async function getProductsByCart(req, res) {
  let user = req.user;
  let carts = await cartsService.getCartById(req.params.cid);

  res.render("productsByCart", { ...carts, user });
}

export async function getUsers(req, res) {
  let user = req.user;
  let prod = await auxGetUsers(req);

  return res.render("users", { ...prod, user });
}

export async function auxGetUsers(req) {
  let limit = req.query.limit;
  let page = req.query.page;
  let sort = req.query.sort;
  let query = req.query.query;

  let prod = await usersService.getUsers(limit, page, sort, query);

  prod.prevLink = prod.hasPrevPage
    ? `http://localhost:8080/users?page=${prod.prevPage}`
    : "";
  prod.nextLink = prod.hasNextPage
    ? `http://localhost:8080/users?page=${prod.nextPage}`
    : "";
  prod.isValid = !(page <= 0 || page > prod.totalPages);

  return prod;
}
