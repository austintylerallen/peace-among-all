import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import '../../src/styles.css';

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <div className="social-media">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebook className="social-icon" />
                        Facebook
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <FaTwitter className="social-icon" />
                        Twitter
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="social-icon" />
                        Instagram
                    </a>
                </div>
                <div className="footer-nav">
                    <Link to="/">Home</Link>
                    <Link to="/shop">Shop</Link>
                    <Link to="/about">About Us</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/testimonials">Testimonials</Link>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Peace Among All. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
