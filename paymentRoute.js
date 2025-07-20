const express = require('express');
const Razorpay = require('razorpay');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

router.get('/', async (req, res) => {
  const options = {
    amount: 100, // 500.00 INR in paise
    currency: 'INR',
    receipt: 'receipt#2'
  };

  try {
    const order = await razorpay.orders.create(options);
    res.render('index', {
      key_id: process.env.RAZORPAY_KEY_ID,
      amount: options.amount,
      order_id: order.id
    });
  } catch (err) {
    console.error('Error creating Razorpay order:', err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
