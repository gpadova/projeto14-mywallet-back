
export default async function tokenAuth(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "");
  if (!token) {
    res.sendStatus(422);
  }
  next()
}
