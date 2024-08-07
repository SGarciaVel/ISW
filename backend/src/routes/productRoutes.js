// backend/routes/productRoutes.js
const express = require("express");
const router = express.Router();
const Product = require("../models/productoprueba.models.js");

// GET: Obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: Agregar un nuevo producto
router.post("/", async (req, res) => {
  const product = new Product({
    name: req.body.name,
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
