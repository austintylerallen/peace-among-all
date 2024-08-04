import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error("No token found");
                    return;
                }

                const config = {
                    headers: {
                        'x-auth-token': token
                    }
                };

                const productsRes = await axios.get('/api/admin/products', config);
                const ordersRes = await axios.get('/api/admin/orders', config);
                const usersRes = await axios.get('/api/admin/users', config);

                setProducts(productsRes.data);
                setOrders(ordersRes.data);
                setUsers(usersRes.data);
            } catch (error) {
                console.error("There was an error fetching the data!", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <h2>Products</h2>
            <ul>
                {products.map(product => (
                    <li key={product._id}>
                        {product.name} - ${product.price / 100}
                    </li>
                ))}
            </ul>
            <h2>Orders</h2>
            <ul>
                {orders.map(order => (
                    <li key={order._id}>
                        Order by {order.user.name} - ${order.total / 100}
                    </li>
                ))}
            </ul>
            <h2>Users</h2>
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        {user.name} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
