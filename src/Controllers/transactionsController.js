import { transactions, transactionSchema } from "../index.js";
import joi from "joi"
import dayjs from "dayjs";

export async function insereTransacao(req, res) {
  const transacao = req.body;
  const {authorization} = req.headers;
  const {id} = req.headers;
  const { valor, descricao, tipo } = req.body;

  const token = authorization?.replace("Bearer", "")
  console.log(token)

  const validationSchema = transactionSchema.validate(transacao, {
    abortEarly: false,
  });

  try {
    if (validationSchema.error) {
      const errors = validationSchema.error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }

    if(!token){
      res.sendStatus(422)
    }
    await transactions.insertOne({
      valor,
      descricao,
      tipo,
      data: dayjs().format("DD/MM"),
      id 
    });
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.status(422).send(error)
  }
}

export async function pegaTransacoes(req, res) {
  const {authorization} = req.headers;
  const token = authorization?.replace("Bearer", "")
  const {id} = req.headers;
  const idArrayed = toString(id)
  try{
    const transacoes = await transactions.find({id}).toArray()
    res.send(transacoes)
  }catch(error){
    res.sendStatus(404)
  }
}
