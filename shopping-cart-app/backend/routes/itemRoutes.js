const router = require('express').Router();
const Item = require('../models/Item');

router.get('/', async (req, res) => {
  const items = await Item.find();
  res.send(items);
});

module.exports = router