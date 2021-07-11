import axios from "axios"
import { useEffect } from "react"
import { useRecoilState } from "recoil"
import AdminLoginPage from "./pages/admin/AdminLoginPage"
import UserLoginPage from "./pages/user/UserLoginPage"
import { userDataState } from "./recoil/atoms"
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar"
import Homepage from "./pages/user/Homepage"
import CheckoutPage from "./pages/user/CheckoutPage"
import PrivetRoute from "./components/PrivetRoute"
import AdminDashboardPage from "./pages/admin/AdminDashboardPage"
import CategoryPreview from "./components/CategoryPreview"
import UserOrdersPage from "./pages/user/UserOrdersPage"

const App = () => {

  const [userData, setUserData] = useRecoilState(userDataState);
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  useEffect(() => {
    if (role && token) {
      axios.get(`/${role}/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => {
          setUserData(res.data);
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
        <Route path="/category/:category">
          <CategoryPreview />
        </Route>
        <Route path="/login">
          <UserLoginPage />
        </Route>
        <PrivetRoute path="/checkout">
          <CheckoutPage />
        </PrivetRoute>
        <PrivetRoute path="/orders">
          <UserOrdersPage />
        </PrivetRoute>
        <Route path="/adminLogin">
          <AdminLoginPage />
        </Route>
        <PrivetRoute path="/dashboard">
          {
            role === 'admins' ? <AdminDashboardPage /> : <Redirect to='/adminLogin' />
          }
        </PrivetRoute>
      </Switch>
    </>
  );
}

export default App;
