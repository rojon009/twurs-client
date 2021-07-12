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
            .then(res => setOrders(res.data?.products))
            .catch(err => console.log(err))
    }, [token])

    return ( orders?.length > 0 ?
        <div className="w-11/12 lg:w-9/12 mx-auto mt-5 last:border-b-2">
            <h2 className="py-3 text-xl underline">You have Ordered these products</h2>
            {
                orders?.map(order => <OrderItem key={order._id} order={order} />)
            }
        </div>
        :
        <h1 className="text-lg text-center mt-20 text-red-400">You did not make any order yet to show.</h1>
    );
};

export default UserOrdersPage;