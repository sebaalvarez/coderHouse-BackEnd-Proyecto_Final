import ProductManager from "./productManager.js";
const path = "../files";

/* Se creará una instancia de la clase “ProductManager”
  Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
  */
// test1();

/*
Se llamará al método “addProduct” con los campos:
title: “producto prueba”, || description:”Este es un producto prueba”
price:200, || thumbnail:”Sin imagen” || code:”abc123”, || stock:25
El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
*/
// test2();

/* Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
 */
// test3();

/* Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.
 */
// test4(1678781786583);

/* Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.
 */
// test5(1678781786583, "Título34", "desc34", 153, "path imagen34", "Cod9", 5003);

/* Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.
 */
// test6(1678223199507);

async function test1() {
  console.log(await new ProductManager(path).getProducts());
}

function test2() {
  let productos = new ProductManager(path);
  productos.addProduct("Titulo0", "desc0", 200, "Sin imagen", "Cod0", 25);
  productos.addProduct("Título1", "desc1", 50, "path imagen1", "Cod1", 500);
  productos.addProduct("Título2", "desc2", 100, "path imagen2", "Cod2", 500);
  productos.addProduct("Título3", "desc3", 150, "path imagen3", "Cod3", 500);
  productos.addProduct("Título4", "desc4", 200, "path imagen4", "Cod4", 500);
  productos.addProduct("Título5", "desc5", 250, "path imagen5", "Cod5", 500);
  productos.addProduct("Título6", "desc6", 300, "path imagen6", "Cod6", 500);
  productos.addProduct("Título7", "desc7", 350, "path imagen7", "Cod7", 500);
  productos.addProduct("Título8", "desc8", 400, "path imagen8", "Cod8", 500);
  // COD REPETIDO
  productos.addProduct("Título3", "desc3", 150, "path imagen3", "Cod2", 500);
  // TITULO VACIO
  productos.addProduct("", "descripción2", 150, "path imagen2", "Cod7", 500);
  // SIN TITULO
  productos.addProduct("descripción2", 150, "path imagen2", "Cod8", 500);
}

async function test3() {
  console.log(await new ProductManager(path).getProducts());
}

async function test4(id) {
  console.log(await new ProductManager(path).getProductById(id));
}

function test5(id, tit, dsc, prc, img, cod, stck) {
  new ProductManager(path).updateProductById(id, tit, dsc, prc, img, cod, stck);
}

function test6(id) {
  new ProductManager(path).deleteProductoById(id);
}
