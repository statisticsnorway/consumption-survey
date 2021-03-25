import { useTranslation } from 'react-i18next';
import {ConsumptionForm} from "../../components/questionnaire/questions/ConsumptionForm";
import React from 'react';

function Questionnaire() {
    const {t} = useTranslation('purchases');

    return (
        <div className="App">
            <ConsumptionForm>

            </ConsumptionForm>
        </div>
    );
}

export default Questionnaire;

// const Purchases = () => {
//     const {t} = useTranslation('purchases');
//
//     return (
//         <>
//             <h3>Firebase PoC</h3>
//             <WorkspacePanel>
//             </WorkspacePanel>
//         </>
//     );
// };
//
// export default Purchases;

