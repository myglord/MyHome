require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: ['http://localhost:5173', 'http://127.0.0.1:5173'] }));
app.use(express.json());

// Root - helpful message
app.get('/', (req, res) => {
  res.json({
    message: 'MyHome API',
    docs: 'http://localhost:3001/api/health',
    endpoints: ['/api/health', '/api/db-check', '/api/properties', '/api/contact', '/api/blog', '/api/testimonials'],
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'MyHome API is running' });
});

// Graceful DB connection check
app.get('/api/db-check', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch (err) {
    res.status(503).json({ status: 'error', database: 'disconnected' });
  }
});

// Properties API (matches: id, title, price, type, location, bedrooms, bathrooms, area, image_url, description, status, created_at)
app.get('/api/properties', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM properties ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

app.get('/api/properties/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM properties WHERE id = ?',
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Property not found' });
    }
    const property = rows[0];
    // Fetch images if property_images table exists
    const [images] = await pool.query(
      'SELECT image_url, sort_order FROM property_images WHERE property_id = ? ORDER BY sort_order',
      [req.params.id]
    );
    res.json({ ...property, images: images });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch property' });
  }
});

app.post('/api/properties', async (req, res) => {
  try {
    const { title, description, price, location, status, type, bedrooms, bathrooms, area, image_url } =
      req.body;
    const [result] = await pool.query(
      `INSERT INTO properties (title, description, price, location, status, type, bedrooms, bathrooms, area, image_url)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description || null,
        price ?? 0,
        location || null,
        status || 'active',
        type || 'Buy',
        bedrooms ?? 0,
        bathrooms ?? 0,
        area || null,
        image_url || null,
      ]
    );
    res.status(201).json({ id: result.insertId, message: 'Property created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create property' });
  }
});

// Contacts API
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }
    await pool.query(
      'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name, email, subject || null, message]
    );
    res.json({ message: 'Message received' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save contact message' });
  }
});

// Users API (for registration/login - extend with password hashing)
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)',
      [name, email, password, phone || null]
    );
    res.status(201).json({ id: result.insertId, message: 'User registered' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email already registered' });
    }
    console.error(err);
    res.status(500).json({ error: 'Failed to register' });
  }
});

const ADMIN_EMAIL = 'admin1@gmail.com';
const ADMIN_PASSWORD = 'Admin@123';

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      return res.json({
        user: { id: 'admin', name: 'Admin', email: ADMIN_EMAIL },
        isAdmin: true,
      });
    }
    const [rows] = await pool.query(
      'SELECT id, name, email, phone, avatar_url FROM users WHERE email = ? AND password = ?',
      [email, password]
    );
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    res.json({ user: rows[0], isAdmin: false });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to login' });
  }
});

// Blog posts API
app.get('/api/blog', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM blog_posts ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

app.get('/api/blog/:slug', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM blog_posts WHERE slug = ?',
      [req.params.slug]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// Testimonials API
app.get('/api/testimonials', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM testimonials ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

// Favorites API (requires user_id)
app.get('/api/favorites/:userId', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT p.* FROM properties p
       INNER JOIN favorites f ON p.id = f.property_id
       WHERE f.user_id = ?`,
      [req.params.userId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
});

app.post('/api/favorites', async (req, res) => {
  try {
    const { user_id, property_id } = req.body;
    if (!user_id || !property_id) {
      return res.status(400).json({ error: 'user_id and property_id are required' });
    }
    await pool.query(
      'INSERT INTO favorites (user_id, property_id) VALUES (?, ?)',
      [user_id, property_id]
    );
    res.json({ message: 'Added to favorites' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Already in favorites' });
    }
    console.error(err);
    res.status(500).json({ error: 'Failed to add favorite' });
  }
});

app.delete('/api/favorites/:userId/:propertyId', async (req, res) => {
  try {
    const [result] = await pool.query(
      'DELETE FROM favorites WHERE user_id = ? AND property_id = ?',
      [req.params.userId, req.params.propertyId]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Favorite not found' });
    }
    res.json({ message: 'Removed from favorites' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to remove favorite' });
  }
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`MyHome API running at http://localhost:${PORT}`);
});
