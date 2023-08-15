import CartsDao from "./db/dao/carts.dao.js";
import ProductsDao from "./db/dao/products.dao.js";
import UsersDao from "./db/dao/users.dao.js";
import TicketsDao from "./db/dao/tickets.dao.js";

import CartsRepository from "./repository/carts.repository.js";
import ProductsRepository from "./repository/products.repository.js";
import UsersRepository from "./repository/users.repository.js";
import TicketsRepository from "./repository/tickets.repository.js";

const cartsDao = new CartsDao();
const productsDao = new ProductsDao();
const usersDao = new UsersDao();
const ticketsDao = new TicketsDao();

export const cartsService = new CartsRepository(cartsDao);
export const productsService = new ProductsRepository(productsDao);
export const usersService = new UsersRepository(usersDao);
export const ticketsService = new TicketsRepository(ticketsDao);
