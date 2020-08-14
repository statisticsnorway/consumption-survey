import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

class MyBrowserRouter extends BrowserRouter {
    constructor(props) {
        super(props);
    }

    history;

    goTo = (to) => {
        history.push(to);
    }
}

export default MyBrowserRouter;
