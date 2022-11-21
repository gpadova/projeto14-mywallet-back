import { Router } from "express";
import { insereTransacao, pegaTransacoes } from "../Controllers/transactionsController.js";
import tokenAuth from "../Middlewares/tokenAuthMiddleware.js";
import transactionSchemaFunc from "../Middlewares/transactionSchemaMiddleware.js";


const transactionsRoutes = Router()
transactionsRoutes.use(tokenAuth)
transactionsRoutes.post("/transaction",transactionSchemaFunc, insereTransacao);
transactionsRoutes.get('/transaction', pegaTransacoes)

export default transactionsRoutes