const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Event = require('../models/Event');
const User = require('../models/User');

dotenv.config({ path: '../.env' });

const events = [
  {
    title: 'Global Tech Summit 2026',
    description: 'Experience the future of technology with industry leaders and innovators.',
    venue: 'Convention Center, New York',
    eventDate: '2026-09-15T09:00:00Z',
    category: 'Tech',
    price: 299,
    maxAttendees: 500,
    bannerImage: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800',
    status: 'Published',
    tags: ['Tech', 'AI', 'Innovation']
  },
  {
    title: 'Neon Nights Music Festival',
    description: 'A weekend of incredible music, light shows, and vibrant atmosphere.',
    venue: 'Sunset Park, Los Angeles',
    eventDate: '2026-10-20T18:00:00Z',
    category: 'Music',
    price: 150,
    maxAttendees: 2000,
    bannerImage: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?w=800',
    status: 'Published',
    tags: ['Music', 'Festival', 'Party']
  },
  {
    title: 'Modern Art Exhibition',
    description: 'Explore the latest masterpieces from contemporary artists around the globe.',
    venue: 'Gallery of Arts, London',
    eventDate: '2027-01-15T10:00:00Z',
    category: 'Art',
    price: 25,
    maxAttendees: 100,
    bannerImage: 'https://images.unsplash.com/photo-1518998053502-53cc8de411e2?w=800',
    status: 'Published',
    tags: ['Art', 'Culture', 'Gallery']
  },
  {
    title: 'Startup Pitch Night',
    description: 'Watch the next big startups pitch their ideas to elite investors.',
    venue: 'Tech Hub, San Francisco',
    eventDate: '2026-08-12T17:00:00Z',
    category: 'Business',
    price: 50,
    maxAttendees: 200,
    bannerImage: 'https://images.unsplash.com/photo-1475721027187-402ad2989a3b?w=800',
    status: 'Published',
    tags: ['Business', 'Startup', 'Networking']
  }
];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Clear existing events
    await Event.deleteMany();
    
    // Find or create a dummy organizer
    let organizer = await User.findOne({ role: 'Organizer' });
    if (!organizer) {
      organizer = await User.create({
        name: 'Admin Organizer',
        email: 'organizer@test.com',
        password: 'password123',
        role: 'Organizer'
      });
    }

    const sampleEvents = events.map(event => {
      return { ...event, organizerId: organizer._id };
    });

    await Event.insertMany(sampleEvents);

    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
