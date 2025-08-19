require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const applicationRoutes = require('./routes/applicationRoutes');
const adminRoutes = require('./routes/adminRoutes');
const path = require('path');

const app = express();

connectDB();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const uploadsDir = path.join(__dirname, 'uploads');
const fs = require('fs');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve static files from uploads directory
app.use('/', express.static(uploadsDir));

// Routes
app.use('/api/applications', applicationRoutes);
app.use('/api/admin', adminRoutes); // Admin auth endpoints

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});