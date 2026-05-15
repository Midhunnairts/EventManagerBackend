const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  venue: { type: String, required: true },
  eventDate: { type: Date, required: true },
  category: { type: String, required: true },
  attendees: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    role: { type: String, enum: ['Guest', 'VIP', 'Staff'], default: 'Guest' },
    ticketType: { type: String },
    checkedIn: { type: Boolean, default: false }
  }],
  price: { type: Number, required: true, default: 0 },
  bannerImage: { type: String },
  status: { type: String, enum: ['Draft', 'Published', 'Cancelled'], default: 'Published' },
  maxAttendees: { type: Number, required: true },
  tags: [String]
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
