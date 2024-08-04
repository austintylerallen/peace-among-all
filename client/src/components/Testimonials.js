// client/src/components/Testimonials.js
import React, { useState } from 'react';

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([
        { id: 1, name: 'John Doe', message: 'Great products and amazing mission!' },
        { id: 2, name: 'Jane Smith', message: 'I love the quality and the message behind this brand.' }
    ]);

    const [newTestimonial, setNewTestimonial] = useState({ name: '', message: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTestimonial({ ...newTestimonial, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTestimonials([...testimonials, { ...newTestimonial, id: testimonials.length + 1 }]);
        setNewTestimonial({ name: '', message: '' });
    };

    return (
        <div className="testimonials">
            <h1>Testimonials</h1>
            <ul>
                {testimonials.map(testimonial => (
                    <li key={testimonial.id}>
                        <h2>{testimonial.name}</h2>
                        <p>{testimonial.message}</p>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <h2>Submit Your Testimonial</h2>
                <input
                    type="text"
                    name="name"
                    value={newTestimonial.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                />
                <textarea
                    name="message"
                    value={newTestimonial.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Testimonials;
