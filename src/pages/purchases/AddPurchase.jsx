import React, { useState, useContext, createContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Camera, AlignLeft, AlignJustify, PlusCircle } from 'react-feather';
import AddItem from './AddItem';
import { AppContext } from '../../App';
import { useFormFields } from '../../common/forms';
import FloatingButton from '../../components/buttons/FloatingButton';
import DropDown from '../../components/dropdown/Dropdown';
import { getSelection, makeOptions, convertDate, pad } from '../../common/formHelpers'

import '../workspace.scss';
import './purchases.scss';

import shops from '../../mock/shops';
import units from '../../mock/units';
import Items from '../../components/Items';

export const PurchaseContext = createContext({});

const transformPurchase = (id, purchase, items) => ({
    id,
    source: getSelection(purchase.shop, shops).name,
    type: 'shop',
    date: convertDate(purchase.date),
    amount: items.reduce((acc, item) => acc + Number.parseFloat(item.totalCost), 0),
    items: purchase.items,
    receipts: purchase.receipts,
});

const transformItem = (item) => ({
    name: item.name,
    unitCost: item.unitPrice,
    quantity: `${Number.parseInt(item.qtyOrCount)} ${units[item.unit - 1].name}`,
    totalCost: item.totalPrice,
});


const AddPurchase = () => {
    const {setConsumptionList} = useContext(AppContext);
    const [items, setItems] = useState([]);
    const [showAddItem, setShowAddItem] = useState(false);
    const [showBarCodeScanner, setShowBarCodeScanner] = useState(false);

    const history = useHistory();
    const {formFields: addPurchaseFields, updateFormFields: updateAddPurchaseFields} = useFormFields({
        shop: '',
        date: '',
        amount: '',
        receipts: [],
    });

    const toggleManualAdd = () => {
        setShowAddItem(!showAddItem);
    };
    const toggleBarCodeScanner = (e) => {
        e.preventDefault();
        setShowBarCodeScanner(!showBarCodeScanner);
    };

    const addNewItem = (item) => {
        const newItems = [...items, transformItem(item)];
        setItems(newItems);

        updateAddPurchaseFields('items')
        setShowAddItem(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting', addPurchaseFields);
        setConsumptionList((prev) => ([
            ...prev,
            transformPurchase(prev.length, addPurchaseFields, items)
        ]));
        history.push('/dashboard');
    };

    return (
        <form className="workspace addPurchase">
            {!showAddItem &&
            <div className="workspace-panel item-form-panel">
                <div className="addPurchaseForm">
                    <label htmlFor="shop">Butikk</label>
                    <DropDown
                        id="addPurchase-shop"
                        options={makeOptions(shops)}
                        onChange={updateAddPurchaseFields('shop')}
                        selection={getSelection(addPurchaseFields.shop, shops).id}
                    />

                    <label htmlFor="date">Dato</label>
                    <input
                        id="date"
                        value={addPurchaseFields.date}
                        onChange={updateAddPurchaseFields('date')}
                    />
                </div>
            </div>
            }
            <PurchaseContext.Provider value={{items, addNewItem}}>
                {!showAddItem && <Items items={items}/>}
                {showAddItem &&
                <AddItem/>
                }
                {showBarCodeScanner &&
                <p>Kommer snart !..</p>
                }
            </PurchaseContext.Provider>

            {(!showAddItem && !showBarCodeScanner) &&
            <button onClick={handleSubmit} className="submitButton">Lagre</button>
            }

            <FloatingButton
                mainProps={{iconActive: <PlusCircle/>}}
                childButtonProps={[
                    {
                        id: 'manual-entry',
                        icon: <AlignLeft/>,
                        onClick: (e) => {
                            toggleManualAdd();
                        },
                    }, {
                        id: 'barcode',
                        icon: <AlignJustify style={{transform: 'rotate(90deg)'}}/>,
                        onClick: toggleBarCodeScanner,
                    }
                ]}
                className="floatingAddNew"
            />
        </form>
    );
};

export default AddPurchase;
