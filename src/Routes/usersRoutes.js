import { Router } from "express";
import {
  insereUsuario,
  verificaSignIn,
} from "../Controllers/userController.js";

const userRouter = Router();

userRouter.post("/sign-up", insereUsuario);
userRouter.post("/sign-in", verificaSignIn);

export default userRouter;
