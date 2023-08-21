import express, { urlencoded } from "express";
import exphbs from "express-handlebars";
import path from "path";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { _dirname } from "../utils.js";
import config from "./config.js";
import { swaggerSpecs } from "../swaggerSpecs.js";

import initializePassport from "../config/passport.config.js";
import { addLogger } from "../config//logger.js";

import performanceRoutes from "../routes/performance-test.routes.js";
import mockingRoutes from "../routes/mocking.routes.js";
import productRoutes from "../routes/products.routes.js";
import cartRoutes from "../routes/carts.routes.js";
import viewsRoutes from "../routes/views.routes.js";
import usersViewRoutes from "../routes/users.views.routes.js";
import sessionsRoutes from "../routes/sessions.routes.js";
import githubLoginViewRoutes from "../routes/github-login.views.routes.js";
import emailRoutes from "../routes/email.routes.js";
import jwtRoutes from "../routes/jwt.routes.js";
import usersRoutes from "../routes/users.routes.js";

const app = express();

app.use(cors());

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(_dirname, "public")));

app.use(addLogger);

app.use(cookieParser("ClavePrivada"));

app.use(
  session({
    // store: fileStorage({ path: "./sessions", ttl: 100, retries: 0 }),
    store: MongoStore.create({
      mongoUrl: config.mongoUrl,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 100,
    }),
    secret: "S3cr3t",
    resave: false,
    saveUninitialized: true,
  })
);

// motor de plantillas
app.set("views", path.join(_dirname, "views"));

app.engine(
  ".hbs",
  exphbs.engine({
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    defaultLayout: "main",
    extname: ".hbs",
  })
);

app.set("view engine", ".hbs");

// Middlewares Passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Endpoints
app.use("/api/performance", performanceRoutes);
app.use("/mockingproducts", mockingRoutes);

app.use("/", viewsRoutes);
app.use("/users", usersViewRoutes);
app.use("/github", githubLoginViewRoutes);

app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/users", usersRoutes);

// Endpoint Autenticaciones
app.use("/api/jwt", jwtRoutes);
app.use("/api/sessions", sessionsRoutes);

// Endpoint prueba Envío de mail
app.use("/api/email", emailRoutes);

// Endpoint prueba Logger
app.get("/loggerTest", (req, res) => {
  req.logger.warning("Prueba de log level warning!");
  res.send("Prueba de logger!");
});

// Endpoint Documentation
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

export default app;
