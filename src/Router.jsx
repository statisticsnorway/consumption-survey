import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from 'react-router-dom';

import Dashboard from './pages/dashboard/Dashboard';
import Home from './pages/home/Home';
import PurchaseDetail from './pages/purchases/PurchaseDetail';

const Routes = (props) => {
    return (
        <BrowserRouter
        >
            <Switch
            >
                <Route path="/">
                    <Home />
                </Route>
                <Route path="/dasboard">
                    <Dashboard />
                </Route>
                <Route path="/purchases">
                    <PurchaseDetail />
                </Route>
            </Switch>
            {props.children}
        </BrowserRouter>
    );
};

export default Routes;
