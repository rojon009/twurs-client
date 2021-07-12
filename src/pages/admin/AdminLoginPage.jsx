import axios from "axios";
import { useRecoilState } from "recoil";
import { userDataState, userLoginState } from "../../recoil/atoms";
import InputGroup from "../../components/InputGroup";
import { useHistory, Redirect } from "react-router-dom";
import { useState } from "react";

const AdminLoginPage = () => {

    const [msg, setMsg] = useState('')

    const [userDetails, setUserDetails] = useRecoilState(userLoginState);
    const [userData, setUserData] = useRecoilState(userDataState);

    const history = useHistory();
    let from = { pathname: '/dashboard' }

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        axios.post('/admins/login', userDetails)
            .then(res => {
                if (Object.keys(res.data).length) {
                    setUserData(res.data);
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('role', 'admins');
                    history.replace(from);
                } else {
                    setMsg('*Your given Info are not founded in database');
                    setTimeout(() => {
                        setMsg('')
                    }, 4000);
                }
            })
            .catch(err => console.log(err))
    }


    return (userData.email ? <Redirect to={from} /> :
        <div className="md:px-5 w-11/12 mx-auto md:w-3/5 lg:w-1/2">
            <h2 className="text-center text-4xl">Login as Admin</h2>
            <form onSubmit={handleLoginSubmit}>
                <InputGroup label="Email" value={userDetails} onChange={setUserDetails} id="email" type="email" name="email" placeholder="Your Email" required />
                <InputGroup label="Password" value={userDetails} onChange={setUserDetails} id="password" type="password" name="password" placeholder="Password" required />
                <button className="bg-green-400 text-white px-20 py-2 mx-auto block" type="submit">Login as Admin</button>
                <p className="text-center text-red-500">{msg}</p>
            </form>
        </div>
    );
};

export default AdminLoginPage;