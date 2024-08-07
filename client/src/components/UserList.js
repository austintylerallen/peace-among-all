import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        'x-auth-token': token
                    }
                };
                const response = await axios.get('/api/admin/users', config);
                setUsers(response.data);
            } catch (error) {
                console.error("There was an error fetching the users!", error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="user-list">
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        <p>{user.name} - {user.email}</p>
                        <p>Role: {user.role}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
