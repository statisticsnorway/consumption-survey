import { useState, useEffect, useContext } from 'react';
import Autocomplete from 'react-autocomplete'
import fb from '../../fb';

import workspaceStyles from '../layout/styles/workspace.module.scss';
import styles from '../../pages/consumption/purchases.module.scss';
import { WorkspacePanel } from '../layout/Workspace';
import { UserContext } from '../common/contexts';

const NewPurchase = () => {
    const [searchTerms, setSearchTerms] = useState([]);
    const [itemName, setItemName] = useState('');
    const [qty, setQty] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [items, setItems] = useState([]);
    const {userInfo} = useContext(UserContext);

    useEffect(() => {
        fb.firestore()
            .collection('searchTerms')
            .onSnapshot(snapshot => {
                const terms = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setSearchTerms(terms);
            });
    }, []);

    const onQtyChange = ({target}) => {
        setQty(target.value);
    };

    const onUnitPriceChange = ({target}) => {
        setUnitPrice(target.value);
    };

    const savePurchase = (e) => {
        e.preventDefault();

        const doc = {
            when: new Date(),
            items,
        };

        fb.firestore()
            .collection(`/users/${userInfo.id}/purchases`)
            .add(doc)
            .then((res) => {
                console.log('new purchase added', res);
            });
    };

    const addItem = (e) => {
        e.preventDefault();
        setItems([
            ...items,
            {itemName, qty, unitPrice}
        ]);
        setItemName('');
        setQty('');
        setUnitPrice('');
    };

    return (
        <>
            <table>
                <tbody>
                {items.map((row, idx) => (
                    <tr key={idx}>
                        <td>{row.itemName}</td>
                        <td>{row.qty}</td>
                        <td>{row.unitPrice}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className={styles.addItemForm}>
                <Autocomplete
                    value={itemName}
                    wrapperStyle={{position: 'relative'}}
                    onChange={(e, value) => {
                        setItemName(value);
                    }}
                    items={searchTerms}
                    renderMenu={(items, value, style) =>
                        (items && (items.length > 0)) ? (
                            <div className={styles.coicopItems} children={items}/>
                        ) : (
                            <></>
                        )
                    }
                    shouldItemRender={(item, value) =>
                        item.text.toLowerCase().indexOf(value.toLowerCase()) > -1
                    }
                    renderItem={(item, highlighted) => (
                        <div>{item.text}</div>
                    )}
                    onSelect={(value) => {
                        setItemName(value);
                    }}
                    getItemValue={(item) => {
                        return item.text;
                    }}
                />
                <input value={qty} onChange={onQtyChange}/>
                <input value={unitPrice} onChange={onUnitPriceChange}/>
                <button onClick={addItem}>Lagre</button>
            </div>
            <button onClick={savePurchase}>Done</button>
        </>
    );
};

export default NewPurchase;
