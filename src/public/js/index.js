// configuracion del socket del lado del cliente
const socket = io();

// Mensaje de inicio cuando se conecta un nuevo cliente
socket.emit("inicio", "Cliente conectado");

// Elimina un producto por ID
document.getElementById("btnDelete").addEventListener("click", () => {
  socket.emit("deleteProduct", document.getElementById("idProd").value);
});

// Agrega Producto
document.getElementById("btnAdd").addEventListener("click", () => {
  let obj = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    price: document.getElementById("price").value,
    thumbnail: document.getElementById("thumbnail").value,
    code: document.getElementById("code").value,
    stock: document.getElementById("stock").value,
    status: document.getElementById("status").value,
    category: document.getElementById("category").value,
  };
  socket.emit("addProduct", obj);
});

// Lista todos los productos del archivo
socket.on("productos", (data) => {
  document.getElementById("tblDatos").innerHTML = creaTabla(data);
});

// En el caso de error de validación en la carga manda mensaje solamente para quien esta cargando
socket.on("error", (data) => {
  if (data !== "0") alert(data);
});

function creaTabla(data) {
  let stringTabla = `<tr> <th> Id</th><th> Nombre </th><th> Descripción </th><th> Precio </th><th> Imágen </th><th> Código </th><th> Stock </th><th> Estado </th><th> Categoría </th> </tr>`;

  data.products.forEach((log) => {
    stringTabla += `<tr> <td> ${log.id} </td><td> ${log.title} </td><td> ${log.description}  </td><td> ${log.price} </td><td> ${log.thumbnail}  </td><td> ${log.code}  </td><td> ${log.stock} </td><td> ${log.status}  </td><td> ${log.category} </td> </tr>`;
  });

  return stringTabla;
}
