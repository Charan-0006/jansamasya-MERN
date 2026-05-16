const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  updateUser,
} = require("../controllers/authController");


// REGISTER

router.post(
  "/register",
  registerUser
);


// LOGIN

router.post(
  "/login",
  loginUser
);


// UPDATE USER

router.put(
  "/:id",
  updateUser
);

module.exports = router;