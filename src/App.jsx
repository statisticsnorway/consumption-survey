import React, { useState, createContext } from 'react';
import Layout from './layout/Layout';

import './App.css';
import './ssb.scss'

import mockList from './mock/consumption';

export const AppContext = createContext({});

const App = () => {
    const [consumptionList, setConsumptionList] = useState(mockList);

    return (
        <AppContext.Provider value={{consumptionList, setConsumptionList}}>
            <Layout/>
        </AppContext.Provider>);
};

export default App;
