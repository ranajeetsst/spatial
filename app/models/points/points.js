const mongoose = require("mongoose");

var pointSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['Point'], required: true }, // Type of geometry
    coordinates: { type: [Number], required: true }, // [longitude, latitude] for a point
  },
  { strict: true, timestamps: true, versionKey: false },
);

pointSchema.index({ coordinates: '2dsphere' });
const Point  = mongoose.model("Points", pointSchema);

module.exports = Point;
