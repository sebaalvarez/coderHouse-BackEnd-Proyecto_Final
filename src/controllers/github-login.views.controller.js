export function login(req, res) {
  res.render("github-login");
}

export function user(req, res) {
  res.redirect("/users");
}

export function error(req, res) {
  res.render("error", { error: "No se pudo autenticar usando GitHub!" });
}
