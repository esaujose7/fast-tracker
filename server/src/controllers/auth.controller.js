const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { createToken } = require("../helpers");

class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ errors: "Please provide an email and password." });

    try {
      const user = await User.findOne({ where: { email } });
      if (!user)
        return res.status(400).json({ msg: "This user doesn't exist." });

      const isCorrectPassword = await bcrypt.compare(password, user.password);

      if (!isCorrectPassword)
        return res.status(400).json({ msg: "Incorrect password." });

      const token = await createToken({
        user: { id: user.id }
      });

      res.json({ token, user });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
}

module.exports = AuthController;
