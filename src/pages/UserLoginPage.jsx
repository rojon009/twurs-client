import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userDataState, userLoginState } from "../recoil/atoms";
import InputGroup from "../components/InputGroup";
import { useState } from "react";

const UserLoginPage = () => {
    const [login, setLogin] = useState(true)
    const [userDetails, setUserDetails] = useRecoilState(userLoginState);
    const setUserData = useSetRecoilState(userDataState);
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if(login){
            axios.post('/users/login',userDetails)
                .then(res => {
                    if(res) {
                        setUserData(res.data);
                        localStorage.setItem('token',res.data.token);
                        localStorage.setItem('role','users');
                    }
                })
                .catch(err => console.log(err))
            } else {
                axios.post('/users/new', userDetails)
                .then(res => {
                    console.log(res);
                    setUserData(res.data)
                    localStorage.setItem('token',res.data.token)
                    localStorage.setItem('role','users');
                })
        }
    }

    
    
    return (
        <div className="md:px-5 w-11/12 mx-auto md:w-3/5 lg:w-1/2">
            <h2 className="text-center text-4xl">{login ? 'Login' : 'Create Account'}</h2>
            <form onSubmit={handleLoginSubmit}>
                {
                    !login && <InputGroup label="Name" value={userDetails} onChange={setUserDetails} id="name" type="name" name="name" placeholder="Your Name" required />
                }
                <InputGroup label="Email" value={userDetails} onChange={setUserDetails} id="email" type="email" name="email" placeholder="Your Email" required />
                <InputGroup label="Password" value={userDetails} onChange={setUserDetails} id="password" type="password" name="password" placeholder="Password"  required/>
                <button className="bg-green-400 text-white px-20 py-2 mx-auto block" type="submit">{login ? 'Login' : 'Create Account'}</button>
            </form>
            {
                login ? 
                <h5 className="text-center py-5">Do not have any account? <button onClick={() => setLogin(false)} className="text-blue-600">Sign Up</button></h5>
                :
                <h5 className="text-center py-5">Already have an account? <button onClick={() => setLogin(true)} className="text-blue-600">Login</button></h5>
                
            }
        </div>
    );
};

export default UserLoginPage;