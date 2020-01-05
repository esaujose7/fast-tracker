const User = require("../models/user");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ errors: "Please provide an email and password." });

    try {
      let user = await User.findOne({ where: { email } });
      if (!user) return res.status(400).json({ msg: "Invalid credentials" });

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      const payload = {
        user: { id: user.id }
      };

      JWT.sign(
        payload,
        JWT_SECRET,
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token, user });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
}

module.exports = AuthController;
