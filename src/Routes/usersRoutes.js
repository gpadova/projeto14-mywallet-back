import { Router } from "express";
import {
  insereUsuario,
  verificaSignIn,
} from "../Controllers/userController.js";
import passwordValid from "../Middlewares/passwordValidationMiddleware.js";
import userPresenceValidation from "../Middlewares/userpresenceMiddlewre.js";
import userSchemaValid from "../Middlewares/userSchemaValidationMiddleware.js";

const userRouter = Router();

userRouter.post("/sign-up",userSchemaValid, insereUsuario);
userRouter.post(
  "/sign-in",
  userPresenceValidation,
  passwordValid,
  verificaSignIn
);

export default userRouter;
