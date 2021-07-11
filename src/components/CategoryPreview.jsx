import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoryNav from "./CategoryNav";
import ProductItem from "./ProductItem";

const CategoryPreview = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`/categories/${category}`)
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.log(err));
  }, [category]);

  return (
    <div className="w-full">
      <CategoryNav />
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 p-3 bg-gray-100">
        {products.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPreview;
