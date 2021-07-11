import { useState } from "react";
import { HiPlusSm, HiMinusSm } from "react-icons/hi";
import { useRecoilState, } from "recoil";
import { cartState } from "../recoil/atoms";


const ProductItem = ({ product }) => {

  const { name, price, quantity, imgUrl } = product;
  const [cart, setCart] = useRecoilState(cartState)
  const [itemQuantity, setItemQuantity] = useState(1);

  const role = localStorage.getItem('role');

  // setItemQuantity based on different button
  const handleQuantity = (e, type) => {
    if (type === "plus") {
      setItemQuantity(itemQuantity + 1);
    } else if (type === "minus") {
      setItemQuantity(itemQuantity - 1);
    } else if (type === "change") {
      if (parseInt(e.target.value) > quantity) {
        alert("You can not buy over quantity");
        return setItemQuantity(quantity);
      }
      setItemQuantity(parseInt(e.target.value));
    }
  };

  const addToCart = () => {
    let cartItem = {
      product: product,
      quantity: itemQuantity
    }

    const findExist = cart.find(item => item.product._id === product._id);
    if (findExist) {
      if (findExist && findExist.product.quantity > findExist.quantity) {
        const index = cart.findIndex(item => item.product._id === product._id);
        const oldCartItem = cart[index];
        cartItem.quantity = oldCartItem.quantity + itemQuantity;
        const newCart = [...cart.slice(0, index), cartItem, ...cart.slice(index + 1)]
        setCart(newCart)
      }
      return;
    }
    setCart([...cart, cartItem])
  }

  return (
    <div className="flex flex-col p-2 bg-white shadow-sm">
      <img
        className="w-full h-44 object-contain"
        src={imgUrl}
        alt="thumbnail"
      />
      <h3 className="leading-6 min-h-[3rem] max-h-[3rem] overflow-hidden">{name}</h3>
      <span className="text-xl text-red-600">${price}</span>
      <span>Availability: {quantity}</span>
      {
        role === 'users' &&
        <>
          <div className="flex w-full space-x-3 mt-3">
            <button
              className="bg-blue-700 rounded-sm flex justify-center items-center text-white w-8 h-8 disabled:bg-gray-400"
              onClick={(e) => handleQuantity(e, "minus")}
              disabled={itemQuantity < 2}
            >
              <HiMinusSm />
            </button>
            <input
              className="border block w-full flex-1 text-center"
              onChange={(e) => handleQuantity(e, "change")}
              value={itemQuantity}
              type="number"
            />
            <button
              className="bg-blue-700 rounded-sm flex justify-center items-center text-white w-8 h-8 disabled:bg-gray-400"
              onClick={(e) => handleQuantity(e, "plus")}
              disabled={itemQuantity >= quantity}
            >
              <HiPlusSm />
            </button>
          </div>
          <button
            className="bg-green-500 rounded-sm text-white px-1 py-1 disabled:bg-gray-400 mt-4"
            disabled={
              !(itemQuantity >= 1 && itemQuantity <= quantity && itemQuantity > 0)
            }
            onClick={addToCart}

          >
            ADD TO CART
          </button>
        </>
      }
    </div>
  );
};

export default ProductItem;
