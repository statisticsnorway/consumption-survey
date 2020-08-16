import React, { useContext } from 'react';
import { Camera } from 'react-feather';
import { useHistory } from 'react-router-dom';
import { useFormFields } from '../../common/forms';
import FloatingButton from '../../components/buttons/FloatingButton';
import { AppContext } from '../../App';

const DMY = /(\d{2})\.(\d{2})\.(\d{4})/;
const convertDate = (hDate) =>
    new Date(hDate.replace(DMY,'$3-$2-$1'));

const transformConsumption = (id, service) => ({
    id,
    source: service.provider,
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

    console.log('Inc', addSvcFields);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting', addSvcFields);
        setConsumptionList((prev) => ([ ...prev, transformConsumption(prev.length, addSvcFields)]));
        history.push('/dashboard');
    };

    return (
        <>
            <form>
                <>
                    <label htmlFor="name">Tjeneste</label>
                    <input
                        id="name"
                        value={addSvcFields.name}
                        onChange={updateAddSvcFields('name')}
                    />

                    <label htmlFor="provider">Hos</label>
                    <input
                        id="provider"
                        value={addSvcFields.provider}
                        onChange={updateAddSvcFields('provider')}
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
                </>

                <button onClick={handleSubmit}>Lagre</button>
            </form>

            <FloatingButton
                mainProps={{ iconActive: <Camera /> }}
                className="floatingAddNew"
            />
        </>
    );
};

export default AddService;
