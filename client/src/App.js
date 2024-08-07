import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import ProductList from './components/ProductList';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ProductDetail from './components/ProductDetail';
import CheckoutForm from './components/CheckoutForm';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import Register from './components/Register';
import UpdateProduct from './components/UpdateProduct';
import PrivateRoute from './components/PrivateRoute';
import './styles.css';

const stripePromise = loadStripe('your_stripe_public_key');

const App = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(atob(token.split('.')[1])); // Decode the token payload
            setIsAuth(true);
            setIsAdmin(user.role === 'admin');
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuth(false);
        setIsAdmin(false);
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
                        <li><Link to="/testimonials">Testimonials</Link></li>
                        {isAuth && isAdmin && <li><Link to="/admin">Admin</Link></li>}
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
                        <Route path="/shop" element={<ProductList />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/testimonials" element={<Testimonials />} />
                        <Route path="/product/:id" element={<ProductDetail />} />
                        <Route path="/checkout" element={<CheckoutForm amount={2000} />} />
                        <Route path="/login" element={<Login setAuth={setIsAuth} />} />
                        <Route path="/register" element={<Register />} />
                        <Route element={<PrivateRoute isAuth={isAuth} isAdmin={isAdmin} />}>
                            <Route path="/admin" element={<AdminDashboard />} />
                            <Route path="/update-product/:id" element={<UpdateProduct />} />
                        </Route>
                    </Routes>
                </Elements>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
