---
## Testing Proyecto Final ##
---

## Primera Pre Entrega

---

Desarrollar el servidor basado en Node.JS y express, que escuche en el puerto 8080 y disponga de dos grupos de rutas: /products y /carts.
Dichos endpoints estarán implementados con el router de express, con las siguientes especificaciones:

Para el manejo de productos, el cual tendrá su router en /api/products/ , configurar las siguientes rutas:

- [x] La ruta raíz GET / deberá listar todos los productos de la base. (Incluyendo la limitación ?limit del desafío anterior
- [x] La ruta GET /:pid deberá traer sólo el producto con el id proporcionado
- [x] La ruta raíz POST / deberá agregar un nuevo producto con los campos:
  - id: Number/String (A tu elección, el id NO se manda desde body, se auto genera asegurando que NUNCA se repetirán los ids en el archivo.
  - title: String,
  - description: String
  - code: String
  - price: Number
  - status: Boolean
  - stock: Number
  - category: String
  - thumbnails: Array de Strings que contenga las rutas donde están almacenadas las imágenes referentes a dicho producto
    Status es true por defecto.
- [x] Todos los campos son obligatorios, a excepción de thumbnails
- [x] VALIDAR QUE EL CODIGO NO EXISTA EN OTRO PRODUCTO
- [x] VALIDAR QUE TODOS LOS CAMPOS SEAN OBLIGATORIOS
- [x] La ruta PUT /:pid deberá tomar un producto y actualizarlo por los campos enviados desde body. NUNCA se debe actualizar o eliminar el id al momento de hacer dicha actualización.
- [x] VALIDAR QUE EL NUEVO CODIGO NO SE ENCUENTRE PARA OTRO PRODUCTO

- [x] La ruta DELETE /:pid deberá eliminar el producto con el pid indicado.

Para el carrito, el cual tendrá su router en /api/carts/, configurar dos rutas:

- [x] La ruta raíz POST / deberá crear un nuevo carrito con la siguiente estructura:
  - Id: Number/String (A tu elección, de igual manera como con los productos, debes asegurar que nunca se dupliquen los ids y que este se autogenere).
  - products: Array que contendrá objetos que representen cada producto
- [x] La ruta GET /:cid deberá listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.
- [x] La ruta POST /:cid/product/:pid deberá agregar el producto al arreglo “products” del carrito seleccionado, agregándose como un objeto bajo el siguiente formato:
  - product: SÓLO DEBE CONTENER EL ID DEL PRODUCTO (Es crucial que no agregues el producto completo)
  - quantity: debe contener el número de ejemplares de dicho producto. El producto, de momento, se agregará de uno en uno.
    Además, si un producto ya existente intenta agregarse al producto, incrementar el campo quantity de dicho producto.

---

## Segunda Pre Entrega

---

Endpoints

- Con base en nuestra implementación actual de productos, modificar el método GET / para que cumpla con los siguientes puntos:

  - [x] Deberá poder recibir por query params un limit (opcional), una page (opcional), un sort (opcional) y un query (opcional)

    - limit permitirá devolver sólo el número de elementos solicitados al momento de la petición, en caso de no recibir limit, éste será de 10.
    - page permitirá devolver la página que queremos buscar, en caso de no recibir page, ésta será de 1
    - query, el tipo de elemento que quiero buscar (es decir, qué filtro aplicar), en caso de no recibir query, realizar la búsqueda general
    - sort: asc/desc, para realizar ordenamiento ascendente o descendente por precio, en caso de no recibir sort, no realizar ningún ordenamiento

  - [x] El método GET deberá devolver un objeto con el siguiente formato:
        {
        status: success/error
        payload: Resultado de los productos solicitados
        totalPages: Total de páginas
        prevPage: Página anterior
        nextPage: Página siguiente
        page: Página actual
        hasPrevPage: Indicador para saber si la página previa existe
        hasNextPage: Indicador para saber si la página siguiente existe.
        prevLink: Link directo a la página previa (null si hasPrevPage=false)
        nextLink: Link directo a la página siguiente (null si hasNextPage=false)
        }

  - [x] Se deberá poder buscar productos por categoría o por disponibilidad, y se deberá poder realizar un ordenamiento de estos productos de manera ascendente o descendente por precio.

Agregar al router de carts los siguientes endpoints:

- [x] DELETE api/carts/:cid/products/:pid deberá eliminar del carrito el producto seleccionado.
- [x] PUT api/carts/:cid deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba.
- [x] PUT api/carts/:cid/products/:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
- [x] DELETE api/carts/:cid deberá eliminar todos los productos del carrito

  Para el modelo de Carts, en su propiedad products, el id de cada producto generado dentro del array tiene que hacer referencia al modelo de Products.

  - [x] Modificar la ruta /:cid para que al traer todos los productos, los traiga completos mediante un “populate”. De esta manera almacenamos sólo el Id, pero al solicitarlo podemos desglosar los productos asociados.

---

Vistas:

- [x] Crear una vista en el router de views ‘/products’ para visualizar todos los productos con su respectiva paginación.
      Cada producto mostrado puede resolverse de dos formas:
      Llevar a una nueva vista con el producto seleccionado con su descripción completa, detalles de precio, categoría, etc. Además de un botón para agregar al carrito. - [x] Contar con el botón de “agregar al carrito” directamente, sin necesidad de abrir una página adicional con los detalles del producto.

- [x] Agregar una vista en ‘/carts/:cid (cartId) para visualizar un carrito específico, donde se deberán listar SOLO los productos que pertenezcan a dicho carrito.

---

## Tercera Pre Entrega

---

- [x] Modificar nuestra capa de persistencia para aplicar los conceptos de Factory (opcional), DAO y DTO.

- [x] El DAO seleccionado (por un parámetro en línea de comandos como lo hicimos anteriormente) será devuelto por una Factory para que la capa de negocio opere con él. (Factory puede ser opcional)

- [x] Implementar el patrón Repository para trabajar con el DAO en la lógica de negocio.

- [x] Modificar la ruta /current (/user) Para evitar enviar información sensible, enviar un DTO del usuario sólo con la información necesaria.

- [x] Realizar un middleware que pueda trabajar en conjunto con la estrategia “current” para hacer un sistema de autorización y delimitar el acceso a dichos endpoints:

  - [x] Sólo el administrador puede crear, actualizar y eliminar productos.
  - [ ] Sólo el usuario puede enviar mensajes al chat.
  - [x] Sólo el usuario puede agregar productos a su carrito.

- [x] Crear un modelo Ticket el cual contará con todas las formalizaciones de la compra. Éste contará con los campos

  - Id (autogenerado por mongo)
  - code: String debe autogenerarse y ser único
  - purchase_datetime: Deberá guardar la fecha y hora exacta en la cual se formalizó la compra (básicamente es un created_at)
  - amount: Number, total de la compra.
  - purchaser: String, contendrá el correo del usuario asociado al carrito.

- [x] Implementar, en el router de carts, la ruta /:cid/purchase, la cual permitirá finalizar el proceso de compra de dicho carrito.

  - La compra debe corroborar el stock del producto al momento de finalizarse
    - Si el producto tiene suficiente stock para la cantidad indicada en el producto del carrito, entonces restarlo del stock del producto y continuar.
    - Si el producto no tiene suficiente stock para la cantidad indicada en el producto del carrito, entonces no agregar el producto al proceso de compra.
    - Al final, utilizar el servicio de Tickets para poder generar un ticket con los datos de la compra.
    - En caso de existir una compra no completada, devolver el arreglo con los ids de los productos que no pudieron procesarse.

- [x] Una vez finalizada la compra, el carrito asociado al usuario que compró deberá contener sólo los productos que no pudieron comprarse. Es decir, se filtran los que sí se compraron y se quedan aquellos que no tenían disponibilidad.

---

## Entrega Final

---

Endpoints:

    /api/users, crear tres rutas:

- [x] GET / deberá obtener todos los usuarios, éste sólo debe devolver los datos principales como nombre, correo, tipo de cuenta (rol)

- [x] DELETE / deberá limpiar a todos los usuarios que no hayan tenido conexión en los últimos 2 días. (puedes hacer pruebas con los últimos 30 minutos, por ejemplo). Deberá enviarse un correo indicando al usuario que su cuenta ha sido eliminada por inactividad

  /api/products/:pid (delete) (ruta protegida)

- [x] Modificar el endpoint que elimina productos, para que, en caso de que el producto pertenezca a un usuario premium, le envie un correo indicandole que el producto fue eliminado.

---

Vistas:

- [ ] Crear una vista para poder visualizar, modificar el rol y eliminar un usuario.

  - [ ] Esta vista únicamente será accesible para el administrador del ecommerce

- [ ] Finalizar las vistas pendientes para la realización de flujo completo de compra. NO ES NECESARIO tener una estructura específica de vistas, sólo las que tú consideres necesarias para poder llevar a cabo el proceso de compra.
  - [x] registro
  - [x] login
  - [x] agregar productos al carrito
  - [x] ver carrito
  - [x] realizar la compra

---

Despliegue:

- [ ] Realizar el despliegue de tu aplicativo en la plataforma de tu elección (Preferentemente Railway.app, pues es la abarcada en el curso) y corroborar que se puede llevar a cabo un proceso de compra completo.

---
