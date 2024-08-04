import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import Register from './components/Register';
import Footer from './components/Footer';
import './styles.css';

const stripePromise = loadStripe('your_stripe_public_key');

const App = () => {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuth(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuth(false);
    };

    return (
        <Router>
            <header>
                <h1>Peace Among All</h1>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/shop">Shop</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                        {isAuth && <li><Link to="/admin">Admin</Link></li>}
                        {!isAuth && <li><Link to="/login">Login</Link></li>}
                        {!isAuth && <li><Link to="/register">Register</Link></li>}
                        {isAuth && <li><button onClick={handleLogout}>Logout</button></li>}
                    </ul>
                </nav>
            </header>
            <main>
                <Elements stripe={stripePromise}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/shop" element={
                            <>
                                <ProductForm />
                                <ProductList />
                            </>
                        } />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/admin" element={isAuth ? <AdminDashboard /> : <Navigate to="/login" />} />
                        <Route path="/login" element={<Login setAuth={setIsAuth} />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </Elements>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
