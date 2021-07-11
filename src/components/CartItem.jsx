import { ImCancelCircle } from "react-icons/im";

const CartItem = ({ cartItem, handleDelete }) => {
  const {
    product: { _id, name, price, imgUrl },
    quantity,
  } = cartItem;

  return (
    <div className="grid grid-cols-12 divide-y-2">
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
        Total: ${quantity * price}
      </span>
      <div className="flex items-center">
        <ImCancelCircle
          onClick={() => handleDelete(_id)}
          className="w-7 h-7 col-span-1 text-red-400 cursor-pointer hover:text-red-600"
        />
      </div>
    </div>
  );
};

export default CartItem;
