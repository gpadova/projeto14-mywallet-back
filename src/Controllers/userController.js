import { usuario, userSchema } from "../index.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function insereUsuario(req, res) {
  const { name, email, password1, password2 } = req.body;
  const user = req.body;
  const validation = userSchema.validate(user, { abortEarly: false });

  try {

    const passwordHash = bcrypt.hashSync(password1, 10);
    await usuario.insertOne({ name, email, password1: passwordHash });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function verificaSignIn(req, res) {
  const { email, password } = req.body;
  const token = uuid();
  const user = await usuario.findOne({ email });
  try {

    return res.send({ userId: user._id, token, nome: user.name });
  } catch (error) {
    console.log(error);
    res.sendStatus(501);
  }
}
