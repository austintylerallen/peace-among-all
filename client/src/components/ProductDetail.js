import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../src/styles.css'; // Assuming all styles are in styles.css now

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/api/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("There was an error fetching the product!", error);
            }
        };

        const fetchReviews = async () => {
            try {
                const response = await axios.get(`/api/reviews/${id}`);
                setReviews(response.data);
            } catch (error) {
                console.error("There was an error fetching the reviews!", error);
            }
        };

        fetchProduct();
        fetchReviews();
    }, [id]);

    const submitReview = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                window.location.href = '/login';
                return;
            }

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                }
            };

            const newReview = { rating, comment };
            await axios.post(`/api/reviews/${id}`, newReview, config);
            setReviews([...reviews, newReview]);
            setRating('');
            setComment('');
        } catch (error) {
            console.error("There was an error submitting the review!", error);
        }
    };

    if (!product) return <div>Loading...</div>;

    return (
        <div className="product-detail">
            <h2>{product.name}</h2>
            <img src={product.imageUrl} alt={product.name} />
            <p>{product.description}</p>
            <p>${(product.price / 100).toFixed(2)}</p>
            <div className="reviews">
                <h3>Reviews</h3>
                <ul>
                    {reviews.map((review, index) => (
                        <li key={index}>
                            <strong>{review.user.name}</strong>
                            <p>Rating: {review.rating}</p>
                            <p>{review.comment}</p>
                        </li>
                    ))}
                </ul>
                <form onSubmit={submitReview}>
                    <div>
                        <label>Rating</label>
                        <input
                            type="number"
                            min="1"
                            max="5"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Comment</label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>
                    <button type="submit">Submit Review</button>
                </form>
            </div>
        </div>
    );
};

export default ProductDetail;
