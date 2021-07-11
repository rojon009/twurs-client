import React from 'react';
import { NavLink, useRouteMatch, Switch, Route, Redirect } from 'react-router-dom';
import AddProductPage from './AddProductPage';
import AdminOrdersPage from './AdminOrdersPage';

const AdminDashboardPage = () => {
    const { url, path } = useRouteMatch();

    return (
        <div className="min-h-screen">
            <div className="md:w-11/12 grid grid-cols-12 mx-auto">
                <div className="opacity-80 col-span-2 min-h-screen flex flex-col text-lg space-y-3 py-5">
                    <NavLink className="border-l-4 border-transparent px-2" activeClassName="border-red-700 text-muted" to={`${url}/addProduct`}>Add Product</NavLink>
                    <NavLink className="border-l-4 border-transparent px-2" activeClassName="border-red-700 text-muted" to={`${url}/orders`}>Orders</NavLink>
                    <NavLink className="border-l-4 border-transparent px-2" activeClassName="border-red-700 text-muted" to={`${url}/manageProduct`}>Manage Product</NavLink>
                </div>
                <div className="p-3 col-span-10">
                    <Switch>
                        <Route exact path={path}>
                            <Redirect to={`${path}/addProduct`} />
                        </Route>
                        <Route path={`${path}/addProduct`}>
                            <AddProductPage />
                        </Route>
                        <Route path={`${path}/orders`}>
                            <AdminOrdersPage />
                        </Route>
                        <Route path={`${path}/manageProduct`}>
                            <h1 className="text-5xl">Mange Product </h1>
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;