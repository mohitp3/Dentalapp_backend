const Register = require("../modal/register");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  validateRegisterUser,
  validateLoginUser,
} = require("../utils/validation");

exports.registeruser = async (req, res) => {
  const { error } = validateRegisterUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //hashingPassword
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);

  const register = new Register({
    name: req.body.name,
    email: req.body.email,
    password: hashedPass,
  });

  const existEmail = await Register.findOne({ email: req.body.email });
  if (existEmail) return res.status(400).send("Email Already exist");

  try {
    const savedUser = await register.save();
    res.send({ user: savedUser._id });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Something went wrong",
    });
  }
};

exports.login = async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await Register.findOne({
    email: req.body.email,
  });
  if (!user) return res.send("Email doesn't exist");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.send("Password is incorrect");

  //create Token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send("Login Successfull");
};
