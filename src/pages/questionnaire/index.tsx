import { useTranslation } from 'react-i18next';
import React from 'react';
import {ConsumptionForm} from "../../components/questionnaire/ConsumptionForm";

function Questionnaire() {
    const {t} = useTranslation('purchases');

    return (
        <div className="section-questionnaire">
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

