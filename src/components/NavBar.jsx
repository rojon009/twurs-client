import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartState, userDataState } from "../recoil/atoms";
import { NavLink} from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';

const NavBar = () => {

    const [userData, setUserData] = useRecoilState(userDataState);
    const cart = useRecoilValue(cartState);

    const handleLogOut = () => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role')
        if(role && token){
            axios.post(`/${role}/logout`,{},{
                headers:{
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
                <NavLink to="/" activeClassName="font-bold">PRODUCTS</NavLink>
                <NavLink to="/checkout" className={!cart.length ? `pointer-events-none text-gray-300` : ''}>
                    <div className="relative">
                        <AiOutlineShoppingCart className="w-12 h-12" />
                        <span className="absolute w-12 h-12 left-1 -top-1 text-xs flex items-center justify-center text-center">{cart.length}</span>    
                    </div>
                </NavLink>
                {
                    !userData.email && <NavLink to='/login'>LOGIN</NavLink>
                }
                <button className="px-3 border mx-3" onClick={handleLogOut}>LogOut</button>
            </div>
        </div>
    );
};

export default NavBar;