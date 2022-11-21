import bcrypt from "bcrypt";
import { usuario, userSchema } from "../index.js";

export default async function passwordValid(req, res, next) {
  const { email, password} = req.body;
  const user = await usuario.findOne({ email });  
  const passwordValidation = bcrypt.compareSync(password, user.password1);
  
  try {

    if (!passwordValidation) {
      return res.sendStatus(401);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }

  next();
}
