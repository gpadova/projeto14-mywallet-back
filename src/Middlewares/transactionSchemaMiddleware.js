import { transactionSchema } from "../index.js";

export default async function transactionSchemaFunc(req, res, next){
    const validationSchema = transactionSchema.validate(transacao, {
        abortEarly: false,
      });

      try{
        if (validationSchema.error) {
            const errors = validationSchema.error.details.map((detail) => detail.message);
            return res.status(422).send(errors);
          }
      }catch(error){
        console.log(error)
        res.sendStatus(500)
      }
}