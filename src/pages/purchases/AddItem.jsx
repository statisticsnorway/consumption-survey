import React, { useContext } from 'react';
import { useFormFields } from '../../common/forms';
import { PurchaseContext } from './AddPurchase';
import { Check } from 'react-feather';
import DropDown from '../../components/dropdown/Dropdown';
import { getSelection, makeOptions } from '../../common/formHelpers';

import '../workspace.scss';
import './purchases.scss';

import units from '../../mock/units';

const AddItem = () => {
    const {addNewItem} = useContext(PurchaseContext);
    const {formFields, updateFormFields} = useFormFields({
        name: '',
        qtyOrCount: 0,
        unit: 'stk',
        unitPrice: '',
        totalPrice: '',
    });

    const onItemAdd = (e) => {
        e.preventDefault();
        console.log('Adding Item', formFields);
        addNewItem(formFields);
    };

    return (
        <div className="workspace-panel item-form-panel addItem">
            <div className="addItemForm">
                <label htmlFor="itemName">Navn</label>
                <input
                    id="itemName"
                    value={formFields.name}
                    onChange={updateFormFields('name')}
                />

                <label htmlFor="itemQty">Antall</label>
                <input
                    id="itemQty"
                    value={formFields.qtyOrCount}
                    onChange={updateFormFields('qtyOrCount')}
                />

                <label htmlFor="itemUnit">Målenhet</label>
                <DropDown
                    id="addItem-units"
                    options={makeOptions(units)}
                    onChange={updateFormFields('unit')}
                    selection={getSelection(formFields.unit, units).id}
                />

                <label htmlFor="unitPrice">Varepris</label>
                <input
                    id="unitPrice"
                    value={formFields.unitPrice}
                    onChange={updateFormFields('unitPrice')}
                />

                <label htmlFor="totalPrice">Total pris</label>
                <input
                    id="totalPrice"
                    value={formFields.totalPrice}
                    onChange={updateFormFields('totalPrice')}
                />
            </div>
            <button class="submitNewItemButton" onClick={onItemAdd}>
                <Check/>
            </button>
        </div>
    );
};

export default AddItem;
