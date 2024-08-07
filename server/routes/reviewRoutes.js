const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// Add a review
router.post('/:productId', auth, async (req, res) => {
    const { rating, comment } = req.body;

    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        const review = new Review({
            user: req.user.id,
            product: req.params.productId,
            rating,
            comment
        });

        await review.save();
        res.json(review);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get reviews for a product
router.get('/:productId', async (req, res) => {
    try {
        const reviews = await Review.find({ product: req.params.productId }).populate('user', 'name');
        res.json(reviews);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
