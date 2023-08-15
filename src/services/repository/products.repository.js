export default class ProductsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  addProduct = (product) => {
    return this.dao.addProduct(product);
  };

  getProducts = (limit, page, sort, query) => {
    return this.dao.getProducts(limit, page, sort, query);
  };

  getProductById = (id) => {
    return this.dao.getProductById(id);
  };

  getProductByCode = (code) => {
    return this.dao.getProductByCode(code);
  };

  updateProductById = (id, product) => {
    return this.dao.updateProductById(id, product);
  };

  deleteProductoById = (id) => {
    return this.dao.deleteProductoById(id);
  };
}
