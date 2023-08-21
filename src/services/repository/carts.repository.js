export default class CartsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  addCart = () => {
    return this.dao.addCart();
  };

  addProductCar = (cid, pid) => {
    return this.dao.addProductCar(cid, pid);
  };

  getCartById = (id) => {
    return this.dao.getCartById(id);
  };

  getCarts = () => {
    return this.dao.getCarts();
  };

  deleteCartById = (id) => {
    return this.dao.deleteCartById(id);
  };

  deleteProducts = (cid) => {
    return this.dao.deleteProducts(cid);
  };

  deleteProductById = (cid, pid) => {
    return this.dao.deleteProductById(cid, pid);
  };

  updateQuantityProduct = (cid, pid, qty) => {
    return this.dao.updateQuantityProduct(cid, pid, qty);
  };

  updateProductByArray = (cid, arr) => {
    return this.dao.updateProductByArray(cid, arr);
  };
}
