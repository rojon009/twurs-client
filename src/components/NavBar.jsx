import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartState, userDataState } from "../recoil/atoms";
import { NavLink } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';
import { Menu } from "@headlessui/react";


const NavBar = () => {

    const [userData, setUserData] = useRecoilState(userDataState);
    const cart = useRecoilValue(cartState);

    const role = localStorage.getItem('role')

    const handleLogOut = () => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role')
        if (role && token) {
            axios.post(`/${role}/logout`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(res => {
                    console.log(res.data);
                    setUserData({});
                    localStorage.clear();
                })
        }
    }

    return (
        <div className="flex justify-between items-center px-10">
            <NavLink to='/'>
                <h1 className="text-4xl font-bold italic text-blue-500">TTS</h1>
            </NavLink>
            <div className="flex items-center space-x-4">
                <NavLink to="/checkout" className={!cart.length ? `pointer-events-none text-gray-300` : ''}>
                    <div className="relative">
                        <AiOutlineShoppingCart className="w-12 h-12" />
                        <span className="absolute w-12 h-12 left-1 -top-1 text-xs flex items-center justify-center text-center">{cart.length}</span>
                    </div>
                </NavLink>
                {
                    userData.email ? (
                        <Menu as="div" className="relative">
                            <Menu.Button className="border-black border rounded px-2 py-1 flex items-center uppercase">{userData.name}<BiChevronDown className="w-6 h-6" /></Menu.Button>
                            <Menu.Items className="absolute bg-white space-y-2 z-10 border rounded shadow-md border-gray-500 top-9 right-0 flex flex-col p-2">
                                <Menu.Item disabled>
                                    <NavLink className="pl-4 py-1 pr-12 hover:bg-blue-400 hover:text-white rounded-sm" to="/">Profile</NavLink>
                                </Menu.Item>
                                {
                                    role === 'admins' && <Menu.Item>
                                        <NavLink className="pl-4 py-1 pr-12 hover:bg-blue-400 hover:text-white rounded-sm" to='/dashboard'>Dashboard</NavLink>
                                    </Menu.Item>
                                }
                                {
                                    role === 'users' &&
                                    <>
                                        <Menu.Item>
                                            <NavLink className="pl-4 py-1 pr-12 hover:bg-blue-400 hover:text-white rounded-sm" to="/orders">Orders</NavLink>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <NavLink className="pl-4 py-1 pr-12 hover:bg-blue-400 hover:text-white rounded-sm flex whitespace-nowrap" to="/checkout">Cart-({cart.length})</NavLink>
                                        </Menu.Item>
                                    </>
                                }
                                <Menu.Item>
                                    <button onClick={handleLogOut} className="pl-4 py-1 pr-12 hover:bg-red-400 text-left bg-red-800 text-white hover hover:text-white rounded-sm">Logout</button>
                                </Menu.Item>
                            </Menu.Items>
                        </Menu>
                    )
                        :
                        <NavLink to='/login' className="text-yellow-800 text-lg font-semibold">LOGIN</NavLink>
                }
            </div>
        </div>
    );
};

export default NavBar;