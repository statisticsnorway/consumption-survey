import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Autocomplete from 'react-autocomplete'
import { FireContext, UserContext } from '../../contexts';
import usePurchases from '../../hocs/usePurchases';

import styles from './purchases.module.scss';

const NewPurchase = ({initialSearchTerms}) => {
    const router = useRouter();
    const [searchTerms, setSearchTerms] = useState([]);
    const [itemName, setItemName] = useState('');
    const [qty, setQty] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [items, setItems] = useState([]);
    const {userInfo} = useContext(UserContext);
    const {firestore} = useContext(FireContext);
    const {addPurchase} = usePurchases();

    useEffect(() => {
        firestore
            .collection('searchTerms')
            .onSnapshot(snapshot => {
                const terms = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                console.log(`**** fetched ${searchTerms.length} search terms`);

                setSearchTerms(terms);
            });
    }, []);

    const onQtyChange = ({target}) => {
        setQty(target.value);
    };

    const onUnitPriceChange = ({target}) => {
        setUnitPrice(target.value);
    };

    const clearItemInfo = () => {
        setItemName('');
        setQty('');
        setUnitPrice('');
    };

    const clearItems = () => {
        setItems([]);
    };

    const savePurchase = (e) => {
        e.preventDefault();

        const doc = {
            when: new Date(),
            items,
        };

        addPurchase(doc)
            .then((res) => {
                console.log('item added', res);
                router.push('/dashboard/Dashboard');
            });

        clearItemInfo();
        clearItems();
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
        <div className={styles.addPurchase}>
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
            <div className={styles.addPurchaseForm}>
                <div className={styles.lineItem}>
                    <Autocomplete
                        value={itemName}
                        className={`${styles.lineItemField} ${styles.lineItemName}`}
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

                    <input
                        value={qty}
                        onChange={onQtyChange}
                        className={`${styles.lineItemField} ${styles.lineItemQty}`}
                    />

                    <input
                        value={unitPrice}
                        onChange={onUnitPriceChange}
                        className={`${styles.lineItemField} ${styles.lineItemPrice}`}
                    />
                    <button onClick={addItem}>Lagre</button>
                </div>
            </div>
            <button onClick={savePurchase}>Done</button>
        </div>
    );
};

export default NewPurchase;
