class Product {
  static id = 0;
  constructor(titulo, desc, precio, foto, codigo, unidades, status, category) {
    // this.id = ++Product.id;
    this.id = Date.now();
    this.title = titulo;
    this.description = desc;
    this.price = precio;
    this.thumbnail = [...foto];
    this.code = codigo;
    this.stock = unidades;
    this.status = status;
    this.category = category;
  }
}
export default Product;
