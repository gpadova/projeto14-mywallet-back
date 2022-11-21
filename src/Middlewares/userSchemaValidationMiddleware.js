import { usuario, userSchema } from "../index.js";
import bcrypt from "bcrypt";

export default async function userSchemaValid(req, res, next) {
  const { name, email, password1, password2 } = req.body;
  const user = req.body;
  const validation = userSchema.validate(user, { abortEarly: false });

  if(password1 !== password2){
    return res.sendStatus(500)
  }

  try{
    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
      }

  }catch(error){
    console.log(error)
    res.sendStatus(500)
  }
  next()
}
