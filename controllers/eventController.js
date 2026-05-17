const Event = require('../models/Event');

const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ status: 'Published' }).populate('organizerId', 'name');
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('organizerId', 'name');
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createEvent = async (req, res) => {
  try {
    const { title, description, venue, eventDate, category, price, maxAttendees, tags, bannerImage } = req.body;
    
    const event = await Event.create({
      title,
      description,
      venue,
      eventDate,
      category,
      price,
      maxAttendees,
      tags,
      bannerImage,
      organizerId: req.user._id,
      status: 'Published'
    });
    
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getEvents, getEventById, createEvent };
