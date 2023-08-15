export async function githubcallback(req, res) {
  const user = req.user;
  req.session.user = {
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    age: user.age,
  };
  req.session.admin = true;
  res.redirect("/github");
}

export async function register(req, res) {
  console.log("Registrando nuevo usuario.");
  res
    .status(201)
    .send({ status: "success", message: "Usuario creado con exito." });
}

export async function login(req, res) {
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
  req.session.user = {
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    age: user.age,
    role: user.role,
    id: user._id,
  };
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

export async function logout(req, res) {
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
}

export function session(req, res) {
  if (req.session.counter) {
    req.session.counter++;
    res.send(
      `Bienvenido nuevamente, usted ingreso: ${req.session.counter} veces.`
    );
  } else {
    req.session.counter = 1;
    res.send(`Bienvenido, es la primera vez que usted ingresa.`);
  }
}
