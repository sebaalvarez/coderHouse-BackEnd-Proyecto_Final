import productsModel from "../models/products.model.js";
import mongoose from "mongoose";

export default class ProductDao {
  constructor() {
    console.log("Working products with Database persistence in mongodb");
  }

  addProduct = async (product) => {
    try {
      let result = await productsModel.create(product);
      // console.log(`Se cargo el producto ${product.code}`);
      // console.log(`RESULTADO: ${JSON.stringify(result, null, "\t")}`);
      return result;
    } catch (err) {
      console.error(`ERROR agregando Productos: ${err}`);
      return null;
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
      return null;
    }
  };

  getProductById = async (id) => {
    try {
      if (mongoose.Types.ObjectId.isValid(id)) {
        let courses = await productsModel.findOne({ _id: id }).lean();
        return courses;
      } else {
        return null;
      }
    } catch (err) {
      console.error(`ERROR obteniendo Producto por ID: ${err}`);
      return null;
    }
  };

  getProductByCode = async (code) => {
    try {
      let courses = await productsModel.findOne({ code: code });
      return courses;
    } catch (err) {
      console.error(`ERROR obteniendo Producto por Código: ${err}`);
      return null;
    }
  };

  updateProductById = async (id, product) => {
    try {
      let { _id, ...rest } = product;
      if (mongoose.Types.ObjectId.isValid(id)) {
        let result = await productsModel.updateOne({ _id: id }, rest);

        // console.log(`El producto id: ${id} fue actualizado correctamente`);
        return result;
      } else {
        return null;
      }
    } catch (err) {
      console.error(`ERROR actualizando Producto: ${err}`);
      return null;
    }
  };

  deleteProductoById = async (id) => {
    let msg = "";
    try {
      if (mongoose.Types.ObjectId.isValid(id)) {
        let result = await productsModel.deleteOne({ _id: id });
        // console.log(`Se eliminó el producto ${result}`);
      } else {
        return null;
      }
    } catch (err) {
      msg = `ERROR borrando Producto por ID: ${err}`;
      return null;
    } finally {
      console.log(msg);
    }
  };
}
