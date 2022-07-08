const express = require("express");
const route = express.Router();

// --- --- --- --- --- --- Routes (Get, Post, Delete, Put) --- --- --- --- ---

const { Order } = require("../models/order");

// POST

route.post("/", (req, res) => {
  // Requiero al front end la data que ingreso el usuario en el body
  const {
    orderItems,
    shippingAdress,
    city,
    zip,
    country,
    phone,
    status,
    totalPrice,
    user,
    dateOrder,
  } = req.body;
  // Lo guardos en variables
  const newProduct = new Order({
    orderItems,
    shippingAdress,
    city,
    zip,
    country,
    phone,
    status,
    totalPrice,
    user,
    dateOrder,
  });

  newOrders
    .save()
    .then((orders) => res.status(200).json(orders))
    .catch((err) =>
      res.status(500).json({
        request: succes,
        error: err,
      })
    );
});

// GET

route.get("/", async (req, res) => {
  const getOrders = await Order.find();
  getOrders
    ? res.status(200).json(getOrders)
    : res.status(500).json({
        request: unsuccess,
      });
});

module.exports = route;
