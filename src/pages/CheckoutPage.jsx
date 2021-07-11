import { useRecoilState, useRecoilValue } from "recoil";
import CartItem from "../components/CartItem";
import { cartState } from "../recoil/atoms";
import { cartCalcState } from "../recoil/selector";

const CheckoutPage = () => {
    const [cart, setCart] = useRecoilState(cartState);
    const cartCalc = useRecoilValue(cartCalcState)

    const handleDelete = (id) => {
        const filteredCart = cart.filter(item => item.product._id !== id)
        setCart(filteredCart);
    }
    
    return (
        <div className="w-11/12 lg:w-9/12 mx-auto">
            {
                cart.map(cartItem => <CartItem key={cartItem.product._id} handleDelete={handleDelete} cartItem={cartItem} />)
            }
            <div className="grid grid-cols-12 border-t-2 mt-5">
                <div className="col-start-9 col-span-3 text-lg font-bold tracking-wider space-x-2">
                    <span>Total Cost: </span>
                    <span>${cartCalc}</span>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;