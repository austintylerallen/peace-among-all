import React, { useState } from 'react';
import axios from 'axios';
// import './ProductForm.css';

const ProductForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'x-auth-token': token
                }
            };
            const newProduct = {
                name,
                description,
                price,
                imageUrl,
                category
            };
            await axios.post('/api/products', newProduct, config);
            alert('Product created successfully');
        } catch (error) {
            console.error('There was an error creating the product!', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="product-form">
            <h2>Create Product</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Price (in cents)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
            />
            <select onChange={(e) => setCategory(e.target.value)} required>
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Books">Books</option>
                <option value="Clothing">Clothing</option>
            </select>
            <button type="submit">Create Product</button>
        </form>
    );
};

export default ProductForm;
