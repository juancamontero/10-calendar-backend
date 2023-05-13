const { response } = require("express");
const jwt = require("jsonwebtoken");

const jwtValidator = (req, res = response, next) => {
  // x-token headers
  const token = req.header("x-token");

  // did i received the token?
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No token received in request",
    });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
    // * modifico el req con el resultado de la validación del token
    req.uid = uid;
    req.name = name;

  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "token not valid!",
    });
  }

  next();
};

module.exports = { jwtValidator };
