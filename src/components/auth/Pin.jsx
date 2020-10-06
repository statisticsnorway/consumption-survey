import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PinInput from 'react-pin-input';

import styles from './auth.module.scss';

const Pin = ({length = 4, title = 'Enter PIN', onValidPin, id, validatePin = (chk) => !!chk}) => {
    const [style, setStyle] = useState({});
    const [el, setEl] = useState(null);

    const onComplete = (pin) => {
        if (validatePin(pin)) {
            setStyle({color: 'black'});
            onValidPin(pin);

            // stupid kludge!
            try {
                el.clear();
            } catch (e) {
                // TODO: cleanup
                // ignore for now
            }
        } else {
            setStyle({color: 'red'});
        }
    };

    return (
        <div className={styles.pinLock}>
            <h5>{title}</h5>
            <PinInput
                length={length}
                secret
                initialValue=""
                id={`${id}-cmp`}
                type="numeric"
                inputMode="tel"
                inputStyle={style}
                ref={(r) => setEl(r)}
                onComplete={onComplete}
                autoSelect={true}
            />
        </div>
    );
};

export default Pin;
