import fs from "fs";
import Cart from "../model/cart.js";

class CartManager {
  dirName = "";
  fileName = "carts.json";
  ruta = "";

  constructor(dirName) {
    this.dirName = dirName;
    this.ruta = this.dirName + "/" + this.fileName;
    this.crearDirectorio(this.dirName);
    this.validarExistenciaArchivo(this.ruta);
    this.arrayCarts = JSON.parse(fs.readFileSync(this.ruta, "utf-8"));
  }

  crearDirectorio = async (dirName) => {
    try {
      await fs.promises.mkdir(dirName, { recursive: true });
    } catch (err) {
      console.error(`ERROR al crear directorio del carrito: ${err}`);
    }
  };

  validarExistenciaArchivo = (ruta) => {
    try {
      if (!fs.existsSync(ruta)) fs.writeFileSync(ruta, "[]");
    } catch (err) {
      console.error(`ERROR al crear el archivo de carrito: ${err}`);
    }
  };

  addCart = async () => {
    try {
      this.validarExistenciaArchivo(this.ruta);

      this.arrayCarts.push(new Cart());
      console.log(`Se cargo el carrito`);
      await fs.promises.writeFile(this.ruta, JSON.stringify(this.arrayCarts));
    } catch (err) {
      console.error(`ERROR agregando Carrito: ${err}`);
    }
  };

  addProductCar = async (cid, pid) => {
    try {
      let flag = 0;
      this.validarExistenciaArchivo(this.ruta);
      let arrayC = JSON.parse(await fs.promises.readFile(this.ruta, "utf-8"));
      for (const obj of arrayC) {
        /** Encuentra el carrito con el id indicado */
        if (obj.id === cid) {
          for (const ob of obj.products) {
            /* Encuentra el producto en el carrito => suma cantidad */
            if (ob.id === pid) {
              ob.quantity++;
              flag = 1;
            }
          }

          /* No encuentra el producto en el carrito => lo agrega */
          if (flag === 0) {
            let newP = {
              id: pid,
              quantity: 1,
            };
            obj.products.push(newP);
          }
        }
      }
      await fs.promises.writeFile(this.ruta, JSON.stringify(arrayC));
    } catch (err) {
      console.error(`ERROR no se pudo agregar el producto al carrito ${err}`);
    }
  };

  /*
  getCarts = async () => {
    try {
      this.validarExistenciaArchivo(this.ruta);
      return JSON.parse(await fs.promises.readFile(this.ruta, "utf-8"));
    } catch (err) {
      console.error(`ERROR obteniendo los Carritos: ${err}`);
    }
  };
*/

  getCartById = async (id) => {
    try {
      let prod = {};
      this.validarExistenciaArchivo(this.ruta);
      let arrayP = JSON.parse(await fs.promises.readFile(this.ruta, "utf-8"));
      for (const obj of arrayP) if (obj.id === id) prod = { ...obj };

      return prod;
    } catch (err) {
      console.error(`ERROR obteniendo el Carrito por ID: ${err}`);
    }
  };
}
 
export default CartManager;
