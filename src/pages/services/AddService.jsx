import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Camera } from 'react-feather';
import { AppContext } from '../../App';
import { useFormFields } from '../../common/forms';
import FloatingButton from '../../components/buttons/FloatingButton';
import DropDown from '../../components/dropdown/Dropdown';
import { getSelection, makeOptions, convertDate, pad } from '../../common/formHelpers'

import '../workspace.scss';
import './services.scss';

import services from '../../mock/services';
import providers from '../../mock/providers';

const transformService = (id, service) => ({
    id,
    source: getSelection(service.provider, providers).name,
    type: 'service',
    date: convertDate(service.date),
    amount: service.amount,
    items: [ service.name ],
    receipts: service.receipts,
});

const AddService = () => {
    const { setConsumptionList } = useContext(AppContext);
    const history = useHistory();

    const { formFields: addSvcFields, updateFormFields: updateAddSvcFields } = useFormFields({
        name: '',
        provider: '',
        date: '',
        amount: '',
        receipts: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting', addSvcFields);
        setConsumptionList((prev) => ([ ...prev, transformService(prev.length, addSvcFields)]));
        history.push('/dashboard');
    };

    return (
        <div className="workspace addSvc">
            <form className="workspace-panel item-form-panel ">
                <div className="addSvcForm">
                    <label htmlFor="name">Tjeneste</label>
                    <DropDown
                        id="addService-name"
                        options={makeOptions(services)}
                        onChange={updateAddSvcFields('name')}
                        selection={getSelection(addSvcFields.name, services).id}
                    />

                    <label htmlFor="provider">Hos</label>
                    <DropDown
                        id="addService--provider"
                        options={makeOptions(providers)}
                        onChange={updateAddSvcFields('provider')}
                        selection={getSelection(addSvcFields.provider, providers).id}
                    />

                    <label htmlFor="date">Dato</label>
                    <input
                        id="date"
                        value={addSvcFields.date}
                        onChange={updateAddSvcFields('date')}
                    />

                    <label htmlFor="amount">Beløp</label>
                    <input
                        id="amount"
                        value={addSvcFields.amount}
                        onChange={updateAddSvcFields('amount')}
                    />
                </div>

                <button onClick={handleSubmit} className="submitButton">Lagre</button>
            </form>

            <FloatingButton
                mainProps={{ iconActive: <Camera /> }}
                className="floatingAddNew"
            />
        </div>
    );
};

export default AddService;
