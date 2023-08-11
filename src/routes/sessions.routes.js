import { Router } from "express";
import passport from "passport";
import { generateJWToken } from "../utils.js";

const router = Router();

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/github/error" }),
  async (req, res) => {
    const user = req.user;
    req.session.user = {
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      age: user.age,
    };
    req.session.admin = true;
    res.redirect("/github");
  }
);

router.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/api/sessions/fail-register",
  }),
  async (req, res) => {
    console.log("Registrando nuevo usuario.");
    res
      .status(201)
      .send({ status: "success", message: "Usuario creado con exito." });
  }
);

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/api/sessions/fail-login",
  }),
  async (req, res) => {
    console.log("User found to login:");
    const user = req.user;
    console.log(user);
    if (!user)
      return res.status(401).send({
        status: "error",
        error: "El usuario o la contraseña no coinciden!",
      });
    //    -------------------------------------
    // estas líneas son para generar la sesión
    //    -------------------------------------
    // req.session.user = {
    //   name: `${user.first_name} ${user.last_name}`,
    //   email: user.email,
    //   age: user.age,
    //   role: user.role,
    // };
    // res.send({
    //   status: "success",
    //   payload: req.session.user,
    //   message: "Logueo realizado con exito",

    //    -------------------------------------
    // con estas líneas me genero un token
    //    -------------------------------------
    const acces_Token = generateJWToken(user);
    res.send({ access_token: acces_Token });
  }
);

router.get("/fail-register", (req, res) => {
  res
    .status(401)
    .send({ status: "Error", error: "Failed to process register!" });
});

router.get("/fail-login", (req, res) => {
  res.status(401).send({ status: "Error", error: "Failed to process login!" });
});

router.get("/logout", (req, res) => {
  const user = req.session.user;
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Error", body: err });
    }
    res
      .clearCookie("connect.sid")
      // .send(`session finalizada correctamente ${user}.`);
      .render("login", {});
  });
});

router.get("/session", (req, res) => {
  if (req.session.counter) {
    req.session.counter++;
    res.send(
      `Bienvenido nuevamente, usted ingreso: ${req.session.counter} veces.`
    );
  } else {
    req.session.counter = 1;
    res.send(`Bienvenido, es la primera vez que usted ingresa.`);
  }
});

export default router;
