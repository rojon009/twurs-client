import { HiPlusSm, HiMinusSm } from 'react-icons/hi';

const ProductItem = () => {
    return (
        <div className="border flex flex-col p-2">
            <img className="w-2/3 mx-auto" src="https://static-01.daraz.com.bd/p/1d5395845e2a49433ede1290462d48f7.jpg_340x340q75-product.jpg_.webp" alt="" />
            <h3>i7S tws earphone dual</h3>
            <span>$15</span>
            <span>Availability: 30</span>
            <div className="flex w-full space-x-3">
                <button className="bg-blue-700 rounded-sm flex justify-center items-center text-white w-8 h-8">
                    <HiPlusSm />
                </button>
                <input className="border block w-full flex-1 text-center" type="number" />
                <button className="bg-blue-700 rounded-sm flex justify-center items-center text-white w-8 h-8">
                    <HiMinusSm />
                </button>
            </div>
            <button className="bg-green-500 rounded-sm text-white px-1 py-1">ADD TO CART</button>
        </div>
    );
};

export default ProductItem;