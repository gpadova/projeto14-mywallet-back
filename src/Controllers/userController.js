import { usuario, userSchema } from "../index.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function insereUsuario(req, res) {
  const { name, email, password1, password2 } = req.body;
  const user = req.body;
  const validation = userSchema.validate(user, { abortEarly: false });

  try {
    if (validation.error) {
      const errors = validation.error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }
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
    const passwordValidation = bcrypt.compareSync(password, user.password1);
    console.log(passwordValidation);
    if(!user){
      return res.sendStatus(401)
    }
    if (!passwordValidation) {
      return res.sendStatus(401);
    }
    return res.send({ userId: user._id, token, nome: user.name });
  } catch (error) {
    console.log(error);
    res.sendStatus(501);
  }
}
