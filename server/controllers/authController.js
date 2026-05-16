const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");


// =====================
// REGISTER
// =====================

const registerUser = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User Registered Successfully",
      user,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// =====================
// LOGIN
// =====================

const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: "Invalid Email",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
 { id: user._id },
 process.env.JWT_SECRET,
 { expiresIn:"7d" }
)

    res.json({
      message: "Login Successful",
      token,
      user,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

// =====================
// UPDATE USER
// =====================

const updateUser = async (req, res) => {

  try {

    const { id } = req.params;

    const { name, email } = req.body;

    const updatedUser =
      await User.findByIdAndUpdate(

        id,

        {
          name,
          email,
        },

        {
          new: true,
        }
      );

    res.json(updatedUser);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
};