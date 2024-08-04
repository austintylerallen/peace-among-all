// client/src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <div className="hero">
                <h1>Welcome to Peace Among All</h1>
                <p>Promoting peace, unity, and love through fashion.</p>
                <Link to="/shop" className="cta-button">Shop Now</Link>
            </div>
        </div>
    );
};

export default Home;
