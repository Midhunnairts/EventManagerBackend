const Order = require('../models/Order');
const Event = require('../models/Event');

const createOrder = async (req, res) => {
  const { eventId, attendees, totalAmount } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const order = await Order.create({
      userId: req.user._id,
      eventId,
      attendees,
      totalAmount,
      status: 'Paid'
    });

    // Add attendees to the event model if needed, or just track in Order
    event.attendees = [...event.attendees, ...attendees.map(a => ({
      name: a.name,
      userId: req.user._id
    }))];
    
    await event.save();

    res.status(201).json(order);
  } catch (error) {
    console.error('Order Creation Error:', error);
    res.status(500).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('eventId').populate('userId', 'name email');
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, getOrderById };
