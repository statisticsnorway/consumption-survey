import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PinInput from 'react-pin-input';

import styles from './auth.module.scss';

const Pin = ({length = 4, initialValue = '', onValidPin, validatePin = (chk) => !!chk}, id) => {
    const [style, setStyle] = useState({});

    const onComplete = (pin) => {
        console.log(`${pin} => ${validatePin(pin)}`)
        if (validatePin(pin)) {
            onValidPin(pin);
        } else {
            setStyle({color: 'red'});
        }
    };

    return (
        <div className={styles.pinLock}>
            <PinInput
                length={length}
                initialValue={initialValue}
                secret
                onChange={(value, index) => {
                }}
                id={`${id}-cmp`}
                type="numeric"
                inputMode="tel"
                inputStyle={style}
                onComplete={onComplete}
                autoSelect={true}

            />
        </div>
    );
};

export default Pin;
