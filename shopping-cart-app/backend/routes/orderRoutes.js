const router = require('express').Router();
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id }).populate('items');

  if (!cart) return res.send('Cart empty');

  const order = new Order({
    userId: req.user._id,
    items: cart.items
  });

  await order.save();
  cart.items = [];
  await cart.save();

  res.send('Order placed');
});

module.exports = router;