import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import OrderItem from '../../components/OrderItem';

const UserOrdersPage = () => {

    const [orders, setOrders] = useState([])

    const token = localStorage.getItem('token')

    useEffect(() => {
        axios.get('/orders/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => setOrders(res.data.products))
            .catch(err => console.log(err))
    }, [token])

    return (
        <div className="w-11/12 lg:w-9/12 mx-auto">
            {
                orders.map(order => <OrderItem key={order._id} order={order} />)
            }
        </div>
    );
};

export default UserOrdersPage;