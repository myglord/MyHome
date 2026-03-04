require('dotenv').config();
const pool = require('./db');

const sampleProperties = [
  { title: 'Turning Dreams into Addresses', price: 300, type: 'Rent', location: '66 Broklyant, New York America', bedrooms: 2, bathrooms: 1, description: 'Real Estate is a vast industry that deals with the buying, selling, and renting of properties.' },
  { title: 'Your journey home ownership starts here', price: 450, type: 'Buy', location: '66 Broklyant, New York America', bedrooms: 4, bathrooms: 2, description: 'Real Estate is a vast industry that deals with the buying, selling, and renting of properties.' },
  { title: 'Opening Doors to Your Dreams', price: 500, type: 'Rent', location: '66 Broklyant, New York America', bedrooms: 4, bathrooms: 3, description: 'Real Estate is a vast industry that deals with the buying, selling, and renting of properties.' },
];

async function seed() {
  try {
    for (const p of sampleProperties) {
      await pool.query(
        'INSERT INTO properties (title, price, type, location, bedrooms, bathrooms, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [p.title, p.price, p.type, p.location, p.bedrooms, p.bathrooms, p.description]
      );
    }
    console.log('Seeded', sampleProperties.length, 'properties');
  } catch (err) {
    console.error('Seed failed:', err.message);
  } finally {
    process.exit(0);
  }
}

seed();
