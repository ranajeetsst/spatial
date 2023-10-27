const PolygonsModel = require("../../models/polygons/polygons");
const mongoose = require("mongoose");

const get = async(req, res) => {
  try {
    const dataToSend = await PolygonsModel.find().limit(req.query.limit || 10).skip(req.query.skip || 0);
    if (!dataToSend.length) return res.status(404).json({ message: "NOT_FOUND" });

  return res.status(200).send(dataToSend);
  } catch (error) {
    return res.status(500).send({
      message:
      error.message || "Some error is occurred while fatching Polygons",
    });
  }
  
};

const create = async (req, res) => {
  try {
  
  const data =  await PolygonsModel.findOne({ 'coordinates': { $in: req.body.coordinates } }).lean()

  if(data) return res.status(403).json({ message: "Already exists" })

  const dataToSend = await PolygonsModel.create({
    type: 'Polygon', 
    coordinates: req.body.coordinates
  })

  return res.status(201).send(dataToSend);

  } catch (error) {
    return res.status(500).send({
      message:
      error.message || "Some error is occurred while creating Polygons",
    });
  }
};

const update = async (req, res) => {
  try {
    const data = await PolygonsModel
    .findOneAndUpdate(
      {_id: new mongoose.Types.ObjectId(req.params.polygonId)}, 
      {coordinates: req.body.coordinates}
      )
    
    if(!data) return res.status(400).json({ message: "Invaid polygonId!" })

    return res.status(200).send({ message:'Polygons data updated successfully!' });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Some error is occurred while Updatad the Polygons",
    });
  }
};

module.exports = {
  get,
  create,
  update,
};