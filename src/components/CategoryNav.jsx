import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const CategoryNav = () => {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    axios.get('/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="space-x-3 px-3 my-4">
      <NavLink
        className="px-3 py-1 border-blue-300 border rounded-full uppercase"
        activeClassName="bg-blue-300"
        exact
        to="/"
      >
        All
      </NavLink>
      {
        categories.map(category => <NavLink key={category._id}
          className="px-3 py-1 border-blue-300 border rounded-full uppercase"
          activeClassName="bg-blue-300"
          to={`/category/${category.name}`}
        >
          {category.name}
        </NavLink>)
      }
    </div>
  );
};

export default CategoryNav;
