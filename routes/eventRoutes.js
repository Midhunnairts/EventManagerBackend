const express = require('express');
const router = express.Router();
const { getEvents, getEventById, createEvent } = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getEvents);
router.post('/', protect, createEvent);
router.get('/:id', getEventById);

module.exports = router;
