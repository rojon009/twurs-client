import React from 'react';

const OrderItem = ({ order: { product, quantity } }) => {
    const { name, imgUrl, price } = product;
    return (
        <div className="grid grid-cols-12 border-t-2">
            <img
                className="h-16 w-16 object-contain col-span-2"
                src={imgUrl}
                alt=""
            />
            <div className="flex flex-col justify-center col-span-6">
                <span>{name}</span>
                <span>Price: ${price}</span>
                <span>Quantity: {quantity}</span>
            </div>
            <span className="col-span-3 flex items-center">
                Total: ${price * quantity}
            </span>
        </div>
    );
};

export default OrderItem;