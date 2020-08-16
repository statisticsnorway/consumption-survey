import React, { useContext } from 'react';
import { Camera } from 'react-feather';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../App';
import { useFormFields } from '../../common/forms';
import FloatingButton from '../../components/buttons/FloatingButton';
import DropDown from '../../components/dropdown/Dropdown';

import '../workspace.scss';
import './services.scss';

import services from '../../mock/services';
import providers from '../../mock/providers';

const makeOptions = (items) =>
    items.reduce((acc, item) => ({ ...acc, [item.id]: item.name }), {});

const getSelection = (sel, items) =>
    sel ? items.find((item) => `${item.id}` === sel): items[0];

const DMY = /(\d{2})\.(\d{2})\.(\d{4})/;
const convertDate = (hDate) =>
    new Date(hDate.replace(DMY,'$3-$2-$1'));

const transformConsumption = (id, service) => ({
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
        setConsumptionList((prev) => ([ ...prev, transformConsumption(prev.length, addSvcFields)]));
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
