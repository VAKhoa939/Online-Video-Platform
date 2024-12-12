import { Router } from "express";
import {
  getUserByEmail,
  login,
  register,
} from "../controllers/auth.controller";

const route = Router();

route.route("/login").post(login);
route.route("/register").post(register);
route.route("/").post(getUserByEmail);

export default route;
