const express = require('express');
const { createEvent, getEvents, getEventById } = require('../controllers/eventController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .get(getEvents)
  .post(protect, admin, createEvent);

router.get('/:id', getEventById);

module.exports = router;
