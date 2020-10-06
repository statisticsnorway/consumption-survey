import { useState, useContext, useEffect } from 'react';
import Pin from './Pin';
import { AuthContext } from '../common/contexts';

const ManagePin = ({onComplete}) => {
    const {pin, setPin} = useContext(AuthContext);
    const [confirmPin, setConfirmPin] = useState('');
    const [step, setStep] = useState(0);

    switch (step) {
        case 0:
            if (pin) {
                return (
                    <>
                        <Pin
                            title="Oppgi nåværende PIN"
                            id="verify"
                            validatePin={(check) => check === pin}
                            onValidPin={() => {
                                setStep(1);
                            }}
                        />
                    </>
                );
            } else {
                setStep(1);
                return <></>
            }
            break;
        case 1:
            return (
                <>
                    <Pin
                        title="Velg ny PIN"
                        id="pin1"
                        onValidPin={(pin1val) => {
                            setConfirmPin(pin1val);
                            setStep(2)
                        }}
                    />
                </>
            );
            break;
        case 2:
            return (
                <>
                    <Pin
                        title="Bekreft PIN"
                        id="pin2"
                        validatePin={(pin2val) => {
                            console.log(`pin: ${pin} pin1: ${confirmPin} pin2: ${pin2val}`);
                            return pin2val === confirmPin;
                        }}
                        onValidPin={(newPin) => {
                            setPin(newPin);
                            onComplete(newPin);
                        }}
                    />
                </>
            );
            break;
        default:
            return <p>Unknown step</p>;
    }
};

export default ManagePin;
