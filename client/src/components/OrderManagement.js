import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        'x-auth-token': token
                    }
                };
                const response = await axios.get('/api/admin/orders', config);
                setOrders(response.data);
            } catch (error) {
                console.error("There was an error fetching the orders!", error);
            }
        };
        fetchOrders();
    }, []);

    return (
        <div>
            <h2>Orders</h2>
            <ul>
                {orders.map(order => (
                    <li key={order._id}>
                        Order by {order.user.name} - ${order.total / 100}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderManagement;
