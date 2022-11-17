import { func } from "joi";
import { db, usuario, userSchema } from "../index.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function insereUsuario(req, res) {
  const { name, email, password } = req.body;
  const user = req.body;
  const token = uuid();
  const validation = userSchema.validate(user, { abortEarly: false });

  try {
    if (validation.error) {
      const errors = validation.error.map((detail) => detail.message);
      return res.status(422).send(errors);
    }
    const passwordHash = bcrypt.hashSync(password, 10);
    await usuario.insertOne({ name, email, password: passwordHash, token });
    res.sendStatus(201).send(token);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function verificaSignIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = usuario.findOne({email})
    const passwordValidation = bcrypt.compareSync(password, user.passwors)

    if(user && passwordValidation){
        return res.sendStatus(200).send(token)
    }
  } catch (error) {
    console.log(error)
    res.send(500)
  }
}
