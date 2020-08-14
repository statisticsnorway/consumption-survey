import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { BrowserRouter, Route, useHistory } from 'react-router-dom';
import Dashboard from '../pages/dashboard/Dashboard';
import Home from '../pages/home/Home';
import PurchaseDetail from '../pages/purchases/PurchaseDetail';
import { PlusCircle, ShoppingCart, Umbrella } from 'react-feather';
import FloatingButton from '../components/buttons/FloatingButton';
import MyBrowserRouter from '../utils/MyBrowserRouter';

const dummyComponent = text => () => <div className="homeScreen"><h3>{text}</h3></div>;

const Help = dummyComponent('Help');
const Settings = dummyComponent('Settings');
const Profile = dummyComponent('Profile');
const Notifications = dummyComponent('Notifications');

const ADD_PURCHASE_PROPS = {
    iconActive: <PlusCircle/>,
    /* onClick: () => {
        history.push('/purchases/xx');
    }, */
};

const CHILD_BUTTON_PROPS = [
    {
        icon: <Umbrella/>,
        onClick: () => {
            const myRouter = new MyBrowserRouter();
            myRouter.goTo('/purchases/service');
            window.location.reload();
            /* history.push('/purchases/service'); */
        }
    }, {
        icon: <ShoppingCart/>,
        onClick: () => {
            const myRouter = new MyBrowserRouter();
            myRouter.history.push('/purchases/purchase');
            window.location.reload();
            // myRouter.goTo('/purchases/purchase');
            /* history.push('/purchases/purchase'); */
        }
    }
];

const Layout = (props) => {
    const history = useHistory();

    return (
        <BrowserRouter>
            <div className="app">
                <header className="app-header">
                    <Header siteTitle="Forbruk 2021"/>
                </header>
                <div className="header-component-wrapper front-page">
                    <div className="content-wrapper">
                        <Route exact path="/dashboard">
                            <Dashboard/>
                        </Route>
                        <Route exact path="/purchases/:purchaseId">
                            <PurchaseDetail/>
                        </Route>
                        <Route exact path="/help">
                            <Help/>
                        </Route>
                        <Route exact path="/settings">
                            <Settings/>
                        </Route>
                        <Route exact path="/profile">
                            <Profile/>
                        </Route>
                        <Route exact path="/notifications">
                            <Notifications/>
                        </Route>
                        <Route exact path="/">
                            <Home/>
                        </Route>
                    </div>
                </div>
                <div className="footer-wrapper">
                    <div className="footer-content">
                        <Footer/>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default Layout;
