import React from 'react';
import OrderItem from './OrderItem';

const OrderSection = ({ order: { userEmail, products } }) => {
    console.log(products)
    return (
        <div className="border border-black mb-5 p-2">
            <h1 className="text-lg font-bold tracking-wider py-3">Order From: <span className="text-blue-700">{userEmail}</span></h1>
            {
                products.map(order => <OrderItem key={order._id} order={order} />)
            }
        </div>
    );
};

export default OrderSection;