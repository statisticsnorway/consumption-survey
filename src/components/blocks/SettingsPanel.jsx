import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'react-feather';

import styles from './settings.module.scss';

const SettingsPanel = ({title, description, onClick = undefined, expandable = false , children = null}) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        if (expandable) {
            setOpen(!open);
        }

        if (typeof onClick === 'function') {
            onClick();
        }
    };

    return (
        <section className={styles.settingsPanel}>
            <div className={styles.main} onClick={handleClick}>
                <div className={styles.titleAndDesc}>
                    <h4>{title}</h4>
                    <h5>{description}</h5>
                </div>
                {expandable && !open && <ChevronRight className={styles.expandIcon}/>}
                {expandable && open && <ChevronDown className={styles.expandIcon} />}
            </div>
            {expandable && open &&
            <div className={styles.expansion}>
                {children}
            </div>
            }
        </section>
    );
};

export default SettingsPanel;
