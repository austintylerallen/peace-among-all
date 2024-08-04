import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ProductDetail.css'; // Import the CSS file for styling

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        'x-auth-token': token
                    }
                };
                const response = await axios.get(`/api/products/${id}`, config);
                setProduct(response.data);
            } catch (error) {
                console.error("There was an error fetching the product!", error);
            }
        };
        fetchProduct();
    }, [id]);

    if (!product) return <div>Loading...</div>;

    return (
        <div className="product-detail">
            <h2>{product.name}</h2>
            <img src={product.imageUrl} alt={product.name} className="product-detail-image" />
            <p>{product.description}</p>
            <p>${(product.price / 100).toFixed(2)}</p>
        </div>
    );
};

export default ProductDetail;
