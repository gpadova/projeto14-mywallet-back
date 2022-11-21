import { transactions } from "../index.js";

import dayjs from "dayjs";

export async function insereTransacao(req, res) {
  const { id } = req.headers;
  const { valor, descricao, tipo } = req.body;

  try {
    await transactions.insertOne({
      valor,
      descricao,
      tipo,
      data: dayjs().format("DD/MM"),
      id,
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(422).send(error);
  }
}

export async function pegaTransacoes(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "");
  const { id } = req.headers;

  try {
    const transacoes = await transactions.find({ id }).toArray();
    res.send(transacoes);
  } catch (error) {
    res.sendStatus(404);
  }
}
