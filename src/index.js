import express, { json } from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import joi from "joi";
import dotenv from "dotenv";
import { verificaSignIn, insereUsuario } from "./Controllers/userController.js";
import {
  insereTransacao,
  pegaTransacoes,
} from "./Controllers/transactionsController.js";
import userRouter from "./Routes/usersRoutes.js";
import transactionsRoutes from "./Routes/transactionsRoutes.js"
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(transactionsRoutes);

export const userSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  password1: joi.string().required(),
  password2: joi.string().required()
});

export const transactionSchema = joi.object({
  valor: joi.number().required(),
  descricao: joi.string().required(),
  tipo: joi.string().required()
});

const mongoClient = new MongoClient(process.env.MONGO_URL);
try {
  await mongoClient.connect();
  console.log("MongoDB conectado!");
} catch (err) {
  console.log(err);
}

const db = mongoClient.db("my_wallet");
export const usuario = db.collection("users");
export const transactions = db.collection("transactions");


app.listen(5000);
