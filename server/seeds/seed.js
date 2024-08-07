const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config(); // Load environment variables

const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
        insertMockProducts();
    })
    .catch(err => console.error('MongoDB connection error:', err));

const mockProducts = [
    {
        name: 'Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation.',
        price: 29999,
        imageUrl: 'https://via.placeholder.com/150',
        category: 'Electronics'
    },
    {
        name: 'Smart Watch',
        description: 'A smartwatch with various health-tracking features.',
        price: 19999,
        imageUrl: 'https://via.placeholder.com/150',
        category: 'Electronics'
    },
    {
        name: 'Running Shoes',
        description: 'Lightweight running shoes for all terrains.',
        price: 9999,
        imageUrl: 'https://via.placeholder.com/150',
        category: 'Sportswear'
    },
    {
        name: 'Yoga Mat',
        description: 'Durable and comfortable yoga mat.',
        price: 4999,
        imageUrl: 'https://via.placeholder.com/150',
        category: 'Sportswear'
    },
    {
        name: 'Coffee Maker',
        description: 'Programmable coffee maker with auto-brew feature.',
        price: 4999,
        imageUrl: 'https://via.placeholder.com/150',
        category: 'Home Appliances'
    },
    {
        name: 'Blender',
        description: 'High-speed blender perfect for smoothies and shakes.',
        price: 2999,
        imageUrl: 'https://via.placeholder.com/150',
        category: 'Home Appliances'
    }
];

const insertMockProducts = async () => {
    try {
        await Product.insertMany(mockProducts);
        console.log('Mock products inserted successfully');
        mongoose.disconnect();
    } catch (err) {
        console.error('Error inserting mock products:', err);
    }
};
