// * Esto es para que funcione el intellisense nada maás
const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateJWT } = require("../helpers/jwt.js");

// res=response to get intellisense
const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    //* This returns the found user or NULL
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "User already exists",
      });
    }

    user = new User(req.body);

    // * password encryption
    const salt = bcrypt.genSaltSync(); //10 by default
    user.password = bcrypt.hashSync(password, salt);

    await user.save();
    // * JWT generation
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contact with the administrator",
    });
  }
};

const userLogin = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "User not found",
      });
    }

    // * Check password
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Incorrect password",
      });
    }
    // * JWT generation
    const token = await generateJWT(user.id, user.name);

    res.status(200).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contact with the administrator",
    });
  }
};

const tokenRenew = async (req, res = response) => {
  const { uid, name } = req;

  // * JWT generation
  const token = await generateJWT(uid, name);

  res.json({
    ok: true,
    msg: "tokenRenew",
    token,
  });
};

module.exports = {
  createUser,
  userLogin,
  tokenRenew,
};
