import app from "./config/express.js";
import config from "./config/config.js";
import { mongoInstance } from "./config/mongodb-singleton.js";

const httpServer = app.listen(config.port, () => {
  console.log(`Servidor escuchando en el puerto ${config.port}`);
});

mongoInstance();
