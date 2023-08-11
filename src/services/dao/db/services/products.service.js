import productsModel from "../models/products.js";

export default class StudentService {
  constructor() {
    // console.log("Working products with Database persistence in mongodb");
  }

  addProduct = async (product) => {
    try {
      let result = await productsModel.create(product);
      console.log(`Se cargo el producto ${product.code}`);
      console.log(`RESULTADO: ${JSON.stringify(result, null, "\t")}`);
      return result;
    } catch (err) {
      console.error(`ERROR agregando Productos: ${err}`);
      return result;
    }
  };

  getProducts = async (limit, page, sort, query) => {
    try {
      // let courses = await productsModel.find();

      let limite = limit ? limit : 10;
      let pag = page ? page : 1;
      let orden = sort ? { price: sort } : {};
      let objQuery = query ? query : {};

      let prod = await productsModel.paginate(objQuery, {
        limit: limite,
        page: pag,
        sort: orden,
        lean: true,
      });

      return prod;
    } catch (err) {
      console.error(`ERROR obteniendo Productos: ${err}`);
      return [];
    }
  };

  getProductById = async (id) => {
    try {
      let courses = await productsModel.findOne({ _id: id });

      return courses;
    } catch (err) {
      console.error(`ERROR obteniendo Producto por ID: ${err}`);
      return [];
    }
  };

  updateProductById = async (id, product) => {
    try {
      let { _id, ...rest } = product;

      let result = await productsModel.updateOne({ _id: id }, rest);

      console.log(`El producto id: ${id} fue actualizado correctamente`);
      return result;
    } catch (err) {
      console.error(`ERROR actualizando Producto: ${err}`);
    }
  };

  deleteProductoById = async (id) => {
    let msg = "";
    try {
      let result = await productsModel.deleteOne({ _id: id });
      console.log(`Se cargo el producto ${result}`);
    } catch (err) {
      msg = `ERROR borrando Producto por ID: ${err}`;
    } finally {
      console.log(msg);
    }
  };
}
