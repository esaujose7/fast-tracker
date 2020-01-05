const Fasting = require("../models/fasting");

class FastingsController {
  static async getFastings(req, res) {
    try {
      const fastings = await Fasting.findAll({
        where: { userId: req.user.id }
      });
      res.status(200).json(fastings);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }

  static async getLastFast(req, res) {
    try {
      const lastFasting = await Fasting.findOne({
        where: { userId: req.user.id },
        order: [["createdAt", "DESC"]]
      });
      if (lastFasting) {
        return res.status(200).json(lastFasting);
      }
      return res
        .status(200)
        .json({ msg: "This user has not started a fasting yet." });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }

  static async startFast(req, res) {
    try {
      const startedFast = await Fasting.create({ userId: req.user.id });

      return res.status(200).json(startedFast);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }

  // TODO: handle non-existent fasting ids
  static async stopFast(req, res) {
    try {
      const { id } = req.params;
      const fast = await Fasting.findOne({ where: { id } });
      if (!fast) {
        throw Error(`Fasting not updated. id: ${id}`);
      }

      fast.ongoing = false;
      await fast.save();

      return res.status(200).json(fast);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Server Error");
    }
  }
}

module.exports = FastingsController;
