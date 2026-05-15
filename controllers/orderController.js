const Order = require('../models/Order');
const Event = require('../models/Event');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  const { eventId, attendees, totalAmount } = req.body;

  try {
    const order = await Order.create({
      userId: req.user._id,
      eventId,
      attendees,
      totalAmount,
      paymentStatus: 'Pending'
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createOrder };
