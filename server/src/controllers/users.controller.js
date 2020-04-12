const User = require("../models/user");
const { createToken, hashPassword } = require("../helpers");

class UsersController {
  static async loadUser(req, res) {
    try {
      const user = await User.findByPk(req.user.id);
      if (!user)
        return res
          .status(400)
          .json({ msg: "User doesn't exist for this token." });

      return res.json({ user });
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Server Error");
    }
  }

  static async register(req, res) {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password)
      return res.status(400).json({ msg: "Invalid body." });

    try {
      if (await User.findOne({ where: { email } }))
        return res.status(400).json({ msg: "User already exists." });

      const hashedPassword = await hashPassword(password);

      const user = User.build({
        firstName,
        lastName,
        email,
        password: hashedPassword
      });

      await user.save();
      const token = await createToken({
        user: { id: user.id }
      });

      return res.status(201).json({ token });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send({msg: err.message});
    }
  }
}

module.exports = UsersController;
