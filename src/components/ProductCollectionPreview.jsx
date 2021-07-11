import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import ProductItem from "./ProductItem";

const ProductCollectionPreview = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 p-3 bg-gray-100">
      {
        products.map(product => <ProductItem key={product._id} product={product} />)
      }
    </div>
  );
};

export default ProductCollectionPreview;