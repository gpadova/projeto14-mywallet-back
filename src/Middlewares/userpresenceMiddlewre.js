import { usuario } from "../index.js";

export default async function userPresenceValidation(req, res, next) {
    const {email} = req.body
  const user = await usuario.findOne({ email });
  try {
    if (!user) {
      return res.sendStatus(401);
    }
  } catch (error) {
    console.log(error);
  }
  next();
}
