import { useState, useContext, useRef } from 'react';
import Pin from './Pin';
import { AuthContext } from '../common/contexts';

const ManagePin = ({onComplete}) => {
    const {pin, setPin} = useContext(AuthContext);
    const [confirmPin, setConfirmPin] = useState('');
    const [verified, setVerified] = useState(false);

    console.log(`pin: ${pin}, pin1=${confirmPin}`);

    if (pin && !verified) {
        return (
            <>
                <b>Oppgi din nåværende PIN</b>
                <Pin
                    id="verify"
                    validatePin={(check) => check === pin}
                    onValidPin={() => {
                        setVerified(true);
                    }}
                />
            </>
        );
    } else {
        return (
            <>
                <b>Velg en ny PIN</b>
                <Pin
                    id="pin1"
                    initialValue=''
                    onValidPin={(pin1) => {
                        console.log(`pin1=${confirmPin}`);
                        setConfirmPin(pin1);
                    }}
                />
                <Pin
                    id="pin2"
                    validatePin={(pin2) => {
                        console.log(`pin2: ${pin2}`);
                        return pin2 === confirmPin;
                    }}
                    onValidPin={(newPin) => {
                        setPin(newPin);
                        onComplete(newPin);
                    }}
                />
            </>
        );
    }
};

export default ManagePin;
