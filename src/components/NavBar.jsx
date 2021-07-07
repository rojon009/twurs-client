import axios from "axios";
import { useRecoilState } from "recoil";
import { userDataState } from "../recoil/atoms";

const NavBar = () => {
    const [userData, setUserData] = useRecoilState(userDataState)
    
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
        <div>
            
            {
                userData?.name
            }
            <button className="px-3 border mx-3" onClick={handleLogOut}>LogOut</button>
        </div>
    );
};

export default NavBar;