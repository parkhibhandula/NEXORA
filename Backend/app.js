require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Product = require("./models/product");
const Cart = require("./models/cart");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.get("/api/products", async (req,res)=>{
  let items = await Product.find();
  if(items.length === 0){
    items = await Product.insertMany([
      { name: "Shoes", price: 499 },
      { name: "T-Shirt", price: 299 },
      { name: "Watch", price: 999 },
      { name: "Cap", price: 199 },
      { name: "Bag", price: 799 }
    ]);
  }
  res.json(items);
});

app.post("/api/products", async (req, res) => {
  const { name, price, image } = req.body;
  const product = new Product({ name, price, image });
  await product.save();
  res.json({ message: "Product added!", product });
});


app.post("/api/cart", async (req,res)=>{
  console.log("Received:", req.body);
  const { productId, qty } = req.body;
  const product = await Product.findById(productId);

  if(!product) return res.status(404).send("Product not found");

  const item = await Cart.create({
    productId,
    name: product.name,
    price: product.price,
    qty
  });

  res.json(item);
});


app.get("/api/cart", async (req,res)=>{
  const cart = await Cart.find();
  const total = cart.reduce((sum,i)=> sum + i.price*i.qty, 0);
  res.json({ cart, total });
});


app.delete("/api/cart/:id", async (req,res)=>{
  await Cart.findByIdAndDelete(req.params.id);
  res.json({msg:"Removed"});
});

app.put("/api/cart/:id", async (req, res) => {
  try {
    const { qty } = req.body;
    const item = await Cart.findByIdAndUpdate(
      req.params.id,
      { qty },
      { new: true }
    );
    if (!item) return res.status(404).json({ msg: "Item not found" });

    res.json({ msg: "updated", item });
  } catch (err) {
    res.status(500).json({ msg: "error", err });
  }
});


app.post("/api/checkout", async (req,res)=>{
  const cart = await Cart.find();
  const total = cart.reduce((s,i)=> s + i.price*i.qty, 0);
  await Cart.deleteMany();
  res.json({ msg:"Order placed", total, timestamp: new Date() });
});

app.listen(process.env.PORT, ()=> console.log("Server running on 5000"));
