import axios from "axios";
import { useRecoilState } from "recoil";
import { userDataState, userLoginState } from "../../recoil/atoms";
import InputGroup from "../../components/InputGroup";
import { useState } from "react";
import { useHistory, useLocation, Redirect } from "react-router-dom";

const UserLoginPage = () => {

    const [userData, setUserData] = useRecoilState(userDataState);

    const [msg, setMsg] = useState('')

    const [login, setLogin] = useState(true)
    const [userDetails, setUserDetails] = useRecoilState(userLoginState);

    const location = useLocation();
    const history = useHistory();
    let { from } = location.state || { from: { pathname: '/' } }

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (login) {
            axios.post('/users/login', userDetails)
                .then(res => {
                    if (Object.keys(res.data).length) {
                        setUserData(res.data);
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('role', 'users');
                        history.replace(from);
                    } else {
                        setMsg('*Your given Info are not founded in database');
                        setTimeout(() => {
                            setMsg('')
                        }, 4000);
                    }
                })
                .catch(err => console.log(err))
        } else {
            axios.post('/users/new', userDetails)
                .then(res => {
                    setUserData(res.data)
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('role', 'users');
                })
        }
    }



    return (userData.email ? <Redirect to={from} /> :
        <div className="md:px-5 w-11/12 mx-auto md:w-3/5 lg:w-1/2">
            <h2 className="text-center text-4xl">{login ? 'Login' : 'Create Account'}</h2>
            <form onSubmit={handleLoginSubmit}>
                {
                    !login && <InputGroup label="Name" value={userDetails} onChange={setUserDetails} id="name" type="name" name="name" placeholder="Your Name" required />
                }
                <InputGroup label="Email" value={userDetails} onChange={setUserDetails} id="email" type="email" name="email" placeholder="Your Email" required />
                <InputGroup label="Password" value={userDetails} onChange={setUserDetails} id="password" type="password" name="password" placeholder="Password" required />
                <button className="bg-green-400 text-white px-20 py-2 mx-auto block" type="submit">{login ? 'Login' : 'Create Account'}</button>
                <p className="text-center text-red-500">{msg}</p>
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