import express, { Request, Response } from "express";

import { validateShop } from "../core/validators/registerShop.validator";
import { register } from "../controller/authentication/register";
import { validateLogin } from "../core/validators/login.validator";
import { login } from "../controller/authentication/login/login";
import { checkToken } from "../controller/authentication/verifyToken";
import { validateToken } from "../core/validators/token.validator";
const route = express.Router();

//Sign up - POST
route.post("/register", validateShop, register);

//Login - post
route.post("/login", validateLogin, login);

//login -post
route.post("/verifyToken", validateToken, checkToken);

export default route;
