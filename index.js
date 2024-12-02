const express = require('express');
let cors = require('cors');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(express.static('static'));
app.use(cors());

let discountPercentage = 10;
let taxRate = 5;
let loyaltyRate = 2;

// app.get('/shout', (req, res) => {
//   let name = req.query.name;
//   let upperCaseName = name;
//   res.send(upperCaseName);
// });

app.get('/cart-total', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let newItemPrice = parseFloat(req.query.newItemPrice);
  cartTotal += newItemPrice;
  res.send(cartTotal.toString());
});

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember == 'true';
  let totalPrice = 0;

  if (isMember) {
    let discountAmount = (cartTotal * discountPercentage) / 100;
    totalPrice = cartTotal - discountAmount;
  } else {
    totalPrice = cartTotal;
  }

  res.send(totalPrice.toString());
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let taxAmount = (cartTotal * taxRate) / 100;
  let totalPrice = cartTotal - taxAmount;

  res.send(taxAmount.toString());
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  let shippingDays = 0;
  if (shippingMethod === 'express') {
    shippingDays = distance / 100;
  } else {
    shippingDays = distance / 50;
  }
  res.send(shippingDays.toString());
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let shippingCost = weight * distance * 0.1;
  res.send(shippingCost.toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loayltyPoints = purchaseAmount * loyaltyRate;
  res.send(loayltyPoints.toString());
});

app.get('/fulname', (req, res) => {
  let firstName = req.query.firstName;
  let lastName = req.query.lastName;
  let fullName = firstName + ' ' + lastName;
  res.send(fullName);
});

app.get('/date', (req, res) => {
  let month = req.query.month;
  let year = req.query.year;
  let full = month + ', ' + year;
  res.send(full);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
