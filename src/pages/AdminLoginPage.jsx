import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userDataState, userLoginState } from "../recoil/atoms";
import InputGroup from "../components/InputGroup";

const AdminLoginPage = () => {
    const [userDetails, setUserDetails] = useRecoilState(userLoginState);
    const setUserData = useSetRecoilState(userDataState);
    const handleLoginSubmit = (e) => {
        e.preventDefault();
            axios.post('/admins/login',userDetails)
                .then(res => {
                    if(res) {
                        setUserData(res.data);
                        localStorage.setItem('token',res.data.token);
                        localStorage.setItem('role','admins');
                    }
                })
                .catch(err => console.log(err))
        }

    
    
    return (
        <div className="md:px-5 w-11/12 mx-auto md:w-3/5 lg:w-1/2">
            <h2 className="text-center text-4xl">Login as Admin</h2>
            <form onSubmit={handleLoginSubmit}>
                <InputGroup label="Email" value={userDetails} onChange={setUserDetails} id="email" type="email" name="email" placeholder="Your Email" required />
                <InputGroup label="Password" value={userDetails} onChange={setUserDetails} id="password" type="password" name="password" placeholder="Password"  required/>
                <button className="bg-green-400 text-white px-20 py-2 mx-auto block" type="submit">Login as Admin</button>
            </form>
        </div>
    );
};

export default AdminLoginPage;