const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');
const auth = require('../middleware/auth');

// Get user's wishlist
router.get('/', auth, async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ user: req.user.id }).populate('products');
        res.json(wishlist);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Add product to wishlist
router.post('/:productId', auth, async (req, res) => {
    try {
        let wishlist = await Wishlist.findOne({ user: req.user.id });
        if (!wishlist) {
            wishlist = new Wishlist({ user: req.user.id, products: [req.params.productId] });
        } else {
            wishlist.products.push(req.params.productId);
        }
        await wishlist.save();
        res.json(wishlist);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Remove product from wishlist
router.delete('/:productId', auth, async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ user: req.user.id });
        if (wishlist) {
            wishlist.products = wishlist.products.filter(product => product.toString() !== req.params.productId);
            await wishlist.save();
            res.json(wishlist);
        } else {
            res.status(404).json({ msg: 'Wishlist not found' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
