const PointsModel = require("../../models/points/points");
const mongoose = require("mongoose");

const get = async (req, res) => {
  try {
    const dataToSend = await PointsModel.find()
      .limit(req.query.limit || 10)
      .skip(req.query.skip || 0);
      
    if (!dataToSend.length) return res.status(404).json({ message: "NOT_FOUND" });

    return res.status(200).send(dataToSend);
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Some error is occurred while fatching Points",
    });
  }
};

const create = async (req, res) => {
  try {
    if (!(req.body.longitude && req.body.latitude))
      return res
        .status(400)
        .send({ message: "Please enter longitude/latitude" });

    const data = await PointsModel.findOne({
      coordinates: {
        $eq: [parseFloat(req.body.longitude), parseFloat(req.body.latitude)],
      },
    }).lean();

    if (data) return res.status(403).json({ message: "Already exists" });

    const newPoint = await new PointsModel({
      type: "Point",
      coordinates: [parseFloat(req.body.longitude), parseFloat(req.body.latitude)],
    });

    const dataToSend = await newPoint.save();

    return res.status(201).send(dataToSend);
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Some error is occurred while creating Points",
    });
  }
};

const update = async (req, res) => {
  try {
    if (!(req.body.longitude && req.body.latitude))
      return res
        .status(400)
        .send({ message: "Please enter longitude/latitude" });

    const data = await PointsModel.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(req.params.pointId) },
      { coordinates: [req.body.longitude, req.body.latitude] }
    );

    if (!data) return res.status(400).json({ message: "Invaid PointId!" });

    return res
      .status(200)
      .send({ message: "Points data updated successfully!" });
  } catch (error) {
    return res.status(500).send({
      message:
        error.message || "Some error is occurred while Updatad the poins",
    });
  }
};

module.exports = {
  get,
  create,
  update,
};
