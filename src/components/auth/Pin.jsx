import { useState } from 'react';
import { useRouter } from 'next/router';
import PinInput from 'react-pin-input';

import styles from './auth.module.scss';

const Pin = ({length = 4, onValidPin}) => {
    const router = useRouter();
    const [style, setStyle] = useState({});

    const validatePin = (pin) => pin === '2021';

    const onComplete = (pin) => {
        console.log('PIN entered', pin, pin === '2021');
        if (validatePin(pin)) {
            onValidPin();
        } else {
            setStyle({color: 'red'});
        }
    };

    return (
        <div className={styles.pinLock}>
            <PinInput
                length={length}
                initialValue=""
                secret
                onChange={(value, index) => {
                }}
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
