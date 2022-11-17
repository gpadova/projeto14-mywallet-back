import express, { json } from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import joi from "joi";
import dotenv from "dotenv";
import {verificaSignIn , insereUsuario} from "./Controllers/userController.js"
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

export const userSchema = joi.object({
    name: joi.string().required().min(),
    email: joi.string().required(),
    password: joi.string().required()
})


const mongoClient = new MongoClient(process.env.MONGO_URL);
export let db;
mongoClient.connect(() => {
  db = mongoClient.db("my_wallet");
});

export const usuario = db.collection('user')

app.post('sign-up', insereUsuario)

app.post('/sign-in', verificaSignIn)

app.listen(5000)