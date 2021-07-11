import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import OrderRoom from '../../components/OrderSeciton';

const AdminOrdersPage = () => {

    const [orders, setOrders] = useState([])
    const token = localStorage.getItem('token')

    useEffect(() => {
        axios.get('/orders', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => setOrders(res.data))
            .catch(err => console.log(err))
    }, [token])

    return (
        <div className="w-11/12 lg:w-9/12 mx-auto">
            {
                orders.map(order => <OrderRoom key={order._id} order={order} />)
            }
        </div>
    );
};

export default AdminOrdersPage;