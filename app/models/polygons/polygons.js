// const mongoose = require("mongoose");

// var polygonSchema = new mongoose.Schema(
//   {
//     type: { type: String, enum: ['Polygon'], required: true },
//     coordinates: { type: [[Number]], required: true }, // [[[ring1], [ring2], ...]] for a polygon
//   },
//   { timestamps: true, versionKey: false }
// ); 
// polygonSchema.index({ coordinates: '2dsphere' });
// const Polygon  = mongoose.model("Polygons", polygonSchema);

// module.exports = Polygon;

const mongoose = require("mongoose");

var polygonSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['Polygon'], required: true },
    coordinates: {
      type: [[[Number]]], // An array of arrays of coordinates
      required: true
    },
  },
  { timestamps: true, versionKey: false }
);

// Create a 2dsphere index for the coordinates field
polygonSchema.index({ coordinates: '2d' });

const Polygon = mongoose.model("Polygons", polygonSchema);

module.exports = Polygon;

