import { Router } from "express";
import { login, register } from "../controllers/auth.controller";

const route = Router();

route.route("/login").post(login);
route.route("/register").post(register);

export default route;
