import { selector } from "recoil";
import { cartState } from "./atoms";

export const cartCalcState = selector({
    key: 'cartCalcState',
    get: ({ get }) => {
        const cart = get(cartState)
        let totalCost = cart.reduce((acc, cur) => cur.product.price * cur.quantity + acc, 0)
        return totalCost;
    }
})

export const checkoutCartState = selector({
    key: 'checkoutCartState',
    get: ({ get }) => {
        const cart = get(cartState);
        const checkout = cart.map(cartItem => {
            return {
                product: cartItem.product._id,
                quantity: cartItem.quantity
            }
        });
        return checkout;
    }
})