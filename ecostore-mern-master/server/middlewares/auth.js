import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
// Define vars
const JWT_SECRET = process.env.JWT_SECRET;

// Varify token
const verifyToken = (req, res, next) => {
  const token = req.session.jwt;

  if (!token) {
    return res.status(401).send({ error: "You are not authenticated!" });
  }
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res
        .status(401)
        .send({ error: "The token is not available anymore!" });
    }
    req.user = user;
    next();
  });
};

export default verifyToken;
