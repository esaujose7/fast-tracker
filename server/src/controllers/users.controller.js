const User = require("../models/user");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
class UsersController {
  static async register(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { firstName, lastName, email, password } = req.body;

    try {
      let user = await User.findOne({ where: { email } });

      if (user) return res.status(400).json({ msg: "User already exists." });

      user = User.build({ firstName, lastName, email, password });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      const payload = {
        user: { id: user.id }
      };

      JWT.sign(
        payload,
        "shh",
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
}

module.exports = UsersController;
