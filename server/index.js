const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const User = require('./models/User');

const cors = require('cors'); 
require('dotenv').config();

const PORT = process.env.PORT || 5000;  // Declare PORT once at the top
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173' ,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow only this origin
    credentials: true
}));


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://madhini:MADHI123p@cluster0.vkcum.mongodb.net/signin?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
   
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});


// Routes
app.use('/api/auth', authRoutes);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
