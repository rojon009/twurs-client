import { NavLink } from "react-router-dom";

const CategoryNav = () => {
  return (
    <div className="space-x-3 px-3 my-4">
      <NavLink
        className="px-3 py-1 border-blue-300 border rounded-full"
        activeClassName="bg-blue-300"
        exact
        to="/"
      >
        All
      </NavLink>
      <NavLink
        className="px-3 py-1 border-blue-300 border rounded-full"
        activeClassName="bg-blue-300"
        to="/category/mobile"
      >
        Mobile
      </NavLink>
      <NavLink
        className="px-3 py-1 border-blue-300 border rounded-full"
        activeClassName="bg-blue-300"
        to="/category/laptop"
      >
        Laptop
      </NavLink>
      <NavLink
        className="px-3 py-1 border-blue-300 border rounded-full"
        activeClassName="bg-blue-300"
        to="/category/mouse"
      >
        Mouse
      </NavLink>
      <NavLink
        className="px-3 py-1 border-blue-300 border rounded-full"
        activeClassName="bg-blue-300"
        to="/category/keyboard"
      >
        Keyboard
      </NavLink>
      <NavLink
        className="px-3 py-1 border-blue-300 border rounded-full"
        activeClassName="bg-blue-300"
        to="/category/book"
      >
        Book
      </NavLink>
      <NavLink
        className="px-3 py-1 border-blue-300 border rounded-full"
        activeClassName="bg-blue-300"
        to="/category/coffee"
      >
        Coffee
      </NavLink>
    </div>
  );
};

export default CategoryNav;
