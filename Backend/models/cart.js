const mongoose = require("mongoose");
module.exports = mongoose.model("Cart",
  new mongoose.Schema({
    productId:String,
    name:String,
    price:Number,
    qty:Number
  })
);
