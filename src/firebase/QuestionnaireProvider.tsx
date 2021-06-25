import { useStore } from 'react-redux';
import { useState } from 'react';
import {QuestionnaireContext} from '../contexts';

const QuestionnaireProvider = ({ children }) => {
    const store = useStore();
    const [initialized, setInitialized] = useState(false);

    const contextValue = {
        store, initialized, setInitialized
    };

    return (
        <QuestionnaireContext.Provider value={contextValue}>
            {children}
        </QuestionnaireContext.Provider>
    );
};

export default QuestionnaireProvider;
