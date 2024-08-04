import React, { useState } from 'react';
import axios from 'axios';

const CreateProduct = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'x-auth-token': token
                }
            };
            const newProduct = { name, description, price, imageUrl };
            await axios.post('/api/admin/products', newProduct, config);
            alert('Product created successfully');
        } catch (error) {
            console.error("There was an error creating the product!", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Product</h2>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
            <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
            <button type="submit">Create Product</button>
        </form>
    );
};

export default CreateProduct;
