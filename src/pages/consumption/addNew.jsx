import { useState } from 'react';
import Autocomplete from 'react-autocomplete';
import Loader from '../../components/common/Loader';
import { useCoicopSearch } from '../../hocs/coicop';

import workspaceStyles from '../../components/layout/workspace.module.scss';
import styles from './purchases.module.scss';

const AddNewPurchase = () => {
    const {coicopSearchTerm, setCoicopSearchTerm, coicopEntries, loading, error} = useCoicopSearch();
    const [itemName, setItemName] = useState();

    return (
        <div className={`${workspaceStyles.workspacePanel} ${workspaceStyles.itemFormPanel}`}>
            <div className={styles.addItemForm}>
                <label htmlFor="itemName">Jeg har kjøpt ..</label>
                <Autocomplete
                    id="itemName"
                    value={itemName}
                    wrapperStyle={{position: 'relative'}}
                    onChange={(e, value) => {
                        setCoicopSearchTerm(value);
                        setItemName(value);
                    }}
                    items={coicopEntries}
                    renderMenu={(items, value, style) =>
                        (items && (items.length > 0) && coicopSearchTerm)
                            ? <div className={styles.coicopItems} children={items}/>
                            : <></>
                    }
                    shouldItemRender={(item, value) =>
                        item.description.toLowerCase().indexOf(value.toLowerCase()) > -1}
                    renderItem={(item, highlighted) => (
                        <div className={styles.coicopItemName}>{item.description}</div>
                    )}
                    onSelect={value => {
                        setItemName(value)
                    }}
                    getItemValue={(item) => {
                        return item.description;
                    }}
                />
                {loading && <Loader/>}
            </div>
        </div>
    );
};

export default AddNewPurchase;
