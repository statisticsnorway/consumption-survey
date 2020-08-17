import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Welcome from './pages/home/Welcome';
import Dashboard from './pages/dashboard/Dashboard';
import PurchaseDetail from './pages/purchases/PurchaseDetail';

const Routes = (props) => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/dashboard">
                    <Dashboard/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
