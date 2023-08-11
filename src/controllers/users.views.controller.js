export function login(req, res) {
  res.render("login");
}

export function register(req, res) {
  res.render("register");
}

export function profile(req, res) {
  res.render("profile", {
    //la siguiente línea es si se utiliza sesiones
    // user: req.session.user,

    // la siguiente línea es si se utiliza JWT
    user: req.user,
  });
}
