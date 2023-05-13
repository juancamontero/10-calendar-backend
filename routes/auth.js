// * User routes / Auth
//* host + /api/auth

//Solo preciso del router,
//también podría:
// const express = require("express");
// const router = express.router;

const { Router } = require("express");
const { check } = require("express-validator");

const { fieldsValidators } = require("../middlewares/fieldsValidators");

const { createUser, userLogin, tokenRenew } = require("../controllers/auth");
const { jwtValidator } = require("../middlewares/jwtValidator");

const router = Router();

// * Register new user
router.post(
  "/new",
  [
    check("name", "name is required").not().isEmpty(),
    check("email", "email is required").isEmail(),
    check("password", "password must be at least 6 characters").isLength({
      min: 6,
    }),
    fieldsValidators,
  ],
  createUser
);

// * user login
router.post(
  "/",
  [
    check("email", "email is required").isEmail(),
    check("password", "password must be at least 6 characters").isLength({
      min: 6,
    }),
    fieldsValidators,
  ],
  userLogin
);

// * Token renew
router.get("/renew", jwtValidator, tokenRenew);

//export in NODE way
module.exports = router;
