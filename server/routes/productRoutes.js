const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Middleware to check if user is admin
const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Access denied. Not an admin.' });
    }
    next();
};

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error('Error fetching products:', err.message);
        res.status(500).json({ message: err.message });
    }
});

// Get product by id
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        console.error('Error fetching product:', err.message);
        res.status(500).json({ message: err.message });
    }
});

// Add a new product
router.post('/', auth, adminMiddleware, async (req, res) => { // Make sure the route is '/'
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        imageUrl: req.body.imageUrl
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        console.error('Error creating product:', err.message);
        res.status(400).json({ message: err.message });
    }
});

// Delete a product
router.delete('/:id', auth, adminMiddleware, async (req, res) => {
    try {
        console.log(`Attempting to delete product with ID: ${req.params.id}`);
        const product = await Product.findById(req.params.id);
        if (!product) {
            console.error(`Product not found with ID: ${req.params.id}`);
            return res.status(404).json({ message: 'Product not found' });
        }

        await Product.deleteOne({ _id: req.params.id });
        console.log(`Product with ID: ${req.params.id} deleted successfully`);
        res.json({ message: 'Product deleted' });
    } catch (err) {
        console.error('Error deleting product:', err.message);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
