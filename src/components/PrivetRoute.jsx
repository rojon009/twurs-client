import { Redirect, Route } from 'react-router';
import { useRecoilValue } from 'recoil';
import { userDataState } from '../recoil/atoms';

const PrivetRoute = ({ children, ...rest }) => {
    const userData = useRecoilValue(userDataState);
    return (
        <Route
            {...rest} render={
                ({ location }) => userData?.email ? (children) : (<Redirect to={{
                    pathname: '/login',
                    state: { from: location }
                }} />)
            }
        />
    )
};

export default PrivetRoute;