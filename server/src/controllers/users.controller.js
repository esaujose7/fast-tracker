const { User } = require("../models");

class UsersController {
  static test(req, res) {
    User.findAll().then(gigs => {
      console.log(gigs);
      res.status(200).send(gigs);
    });
  }
}

module.exports = UsersController;
