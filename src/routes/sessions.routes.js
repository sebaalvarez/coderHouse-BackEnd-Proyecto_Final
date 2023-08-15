import { Router } from "express";
import passport from "passport";
import { generateJWToken } from "../utils.js";
import {
  githubcallback,
  register,
  login,
  logout,
  session,
} from "../controllers/sessions.controller.js";

const router = Router();

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/github/error" }),
  githubcallback
);

router.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/api/sessions/fail-register",
  }),
  register
);

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/api/sessions/fail-login",
  }),
  login
);

router.get("/fail-register", (req, res) => {
  res
    .status(401)
    .send({ status: "Error", error: "Failed to process register!" });
});

router.get("/fail-login", (req, res) => {
  res.status(401).send({ status: "Error", error: "Failed to process login!" });
});

router.get("/logout", logout);

router.get("/session", session);

export default router;
