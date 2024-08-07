import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        'x-auth-token': token
                    }
                };
                const response = await axios.get('/api/wishlist', config);
                setWishlist(response.data.products);
            } catch (error) {
                console.error("There was an error fetching the wishlist!", error);
            }
        };

        fetchWishlist();
    }, []);

    const removeFromWishlist = async (productId) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'x-auth-token': token
                }
            };
            await axios.delete(`/api/wishlist/${productId}`, config);
            setWishlist(wishlist.filter(product => product._id !== productId));
        } catch (error) {
            console.error("There was an error removing the product from the wishlist!", error);
        }
    };

    return (
        <div>
            <h2>My Wishlist</h2>
            <ul>
                {wishlist.map(product => (
                    <li key={product._id}>
                        <img src={product.imageUrl} alt={product.name} />
                        <div>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <p>${(product.price / 100).toFixed(2)}</p>
                            <button onClick={() => removeFromWishlist(product._id)}>Remove</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Wishlist;
