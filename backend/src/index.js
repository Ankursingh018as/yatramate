require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const aiService = require('./services/aiService');

const app = express();
const PORT = process.env.PORT || 4000;
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Auth routes
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await prisma.user.create({
      data: { name, email, password_hash: hashedPassword }
    });
    
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(400).json({ message: 'User creation failed', error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user || !await bcrypt.compare(password, user.password_hash)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

// Trip routes
app.get('/api/trips', authenticateToken, async (req, res) => {
  try {
    const trips = await prisma.trip.findMany({
      where: { userId: req.user.userId },
      include: { stops: true }
    });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch trips', error: error.message });
  }
});

app.post('/api/trips', authenticateToken, async (req, res) => {
  try {
    const trip = await prisma.trip.create({
      data: { ...req.body, userId: req.user.userId }
    });
    res.json(trip);
  } catch (error) {
    res.status(400).json({ message: 'Trip creation failed', error: error.message });
  }
});

app.get('/api/trips/:id', authenticateToken, async (req, res) => {
  try {
    const trip = await prisma.trip.findFirst({
      where: { id: parseInt(req.params.id), userId: req.user.userId },
      include: { stops: { include: { activities: true } } }
    });
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch trip', error: error.message });
  }
});

// AI Dream Trip endpoint with Gemini integration
app.post('/api/ai/dream-trip', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt || prompt.trim().length === 0) {
      return res.status(400).json({ message: 'Trip prompt is required' });
    }
    
    console.log('Generating trip for prompt:', prompt);
    const tripData = await aiService.generateDreamTrip(prompt);
    
    res.json({
      success: true,
      trip: tripData,
      message: 'Trip generated successfully with AI'
    });
  } catch (error) {
    console.error('Dream trip generation error:', error);
    res.status(500).json({ 
      success: false,
      message: 'AI trip generation failed', 
      error: error.message 
    });
  }
});

// AI Activity suggestions
app.post('/api/ai/suggest-activities', async (req, res) => {
  try {
    const { cityName, preferences } = req.body;
    const activities = await aiService.suggestActivities(cityName, preferences);
    res.json({ activities });
  } catch (error) {
    res.status(500).json({ message: 'Activity suggestion failed', error: error.message });
  }
});

app.get('/', (req, res) => res.send('YatraMate Backend Running with Gemini AI'));

app.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));
