import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ReviewForm = ({ onReviewAdded }) => {
    const { id } = useParams();
    const [review, setReview] = useState({ rating: '', comment: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReview({ ...review, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'x-auth-token': token
                }
            };
            await axios.post(`/api/products/${id}/reviews`, review, config);
            setReview({ rating: '', comment: '' });
            onReviewAdded();
        } catch (error) {
            console.error("There was an error adding the review!", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Rating:</label>
                <input
                    type="number"
                    name="rating"
                    value={review.rating}
                    onChange={handleChange}
                    min="1"
                    max="5"
                />
            </div>
            <div>
                <label>Comment:</label>
                <textarea
                    name="comment"
                    value={review.comment}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Add Review</button>
        </form>
    );
};

export default ReviewForm;
