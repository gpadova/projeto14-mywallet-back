import { Router } from "express";
import { insereTransacao, pegaTransacoes } from "../Controllers/transactionsController.js";


const transactionsRoutes = Router()

transactionsRoutes.post("/transaction", insereTransacao);
transactionsRoutes.get('/transaction', pegaTransacoes)

export default transactionsRoutes