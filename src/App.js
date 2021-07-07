import axios from "axios"
import { useEffect } from "react"
import { useRecoilState } from "recoil"
import AdminLoginPage from "./pages/AdminLoginPage"
import UserLoginPage from "./pages/UserLoginPage"
import { userDataState } from "./recoil/atoms"
import {
  Switch,
  Route
} from "react-router-dom";
import NavBar from "./components/NavBar"
import Homepage from "./pages/Homepage"

const App = () => {

  const [userData, setUserData] = useRecoilState(userDataState);
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  useEffect(() => {
    if(role && token){
      axios.get(`/${role}/me`,{
        headers:{
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => {
          setUserData(res.data);
          console.log(res.data);
        })
    } else {
      setUserData({})
    }
  }, [role, token, setUserData])

  return (
    <>
    <NavBar userData={userData} />
    <Switch>
      <Route path="/" exact>
        <Homepage />
      </Route>
      <Route path="/login">
        <UserLoginPage /> 
      </Route>
      <Route path="/adminLogin">
        <AdminLoginPage />
      </Route>
    </Switch>
    </>
  );
}

export default App;
