const _ = require("lodash");
const bcrpyt = require("bcryptjs");
const User = require("../models/userModel");
const {
  validateRegisterUser,
  validateLoginUser,
} = require("../services/validationServices");
const { generateToken } = require("../services/tokenService");

async function registerUser(req, res) {
  try {
    const { error } = validateRegisterUser(req.body);
    if (error?.details[0])
      return res.status(400).send({ error: error?.details[0]?.message });

    const { name, email, password } = req.body;

    const existedUser = await User.findOne({ email });
    if (existedUser)
      return res.status(400).send({ error: "User already exists" });

    const hashedPassword = await bcrpyt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      const token = generateToken(_.pick(user, ["_id", "name", "email"]))
      res.header("x-auth-token", token).send({ message: "User created successfully" });
    }
  } catch (ex) {
    return res.status(500).send({ error: "Internal Server Error" });
  }
}

async function loginUser(req, res) {
  try {
    const { error } = validateLoginUser(req.body);
    if (error?.details[0])
      return res.status(400).send({ error: error?.details[0]?.message });

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).send({ error: "Invalid email or password" });

    const hashedPassword = await bcrpyt.compare(password, user.password);
    if (!hashedPassword)
      return res.status(400).send({ error: "Invalid email or password" });

    const token = generateToken(_.pick(user, ["_id", "name", "email"]));
    res.header("x-auth-token", token).send({ token });
    console.log(hashedPassword);
  } catch (ex) {
    return res.status(500).send({ error: "Internal Server Error", ex });
  }
}

module.exports = {
  loginUser,
  registerUser,
};
