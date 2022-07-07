const express = require("express");
const route = express.Router();

// --- --- --- --- --- --- Routes (Get, Post, Delete, Put) --- --- --- --- ---

const { Product: Category } = require("../models/category");

// POST

route.post("/", (req, res) => {
  // Requiero al front end la data que ingreso el usuario en el body
  const { name, image, countStock } = req.body;
  // Lo guardos en variables
  const newProduct = new Category({
    name,
    image,
    countStock,
  });

  newProduct
    .save()
    .then((product) => res.status(200).json(product))
    .catch((err) =>
      res.status(500).json({
        request: succes,
        error: err,
      })
    );
});

// GET

route.get("/", async (req, res) => {
  const getProduct = await Category.find();
  getProduct
    ? res.status(200).json(getProduct)
    : res.status(500).json({
        request: unsuccess,
      });
});

module.exports = route;