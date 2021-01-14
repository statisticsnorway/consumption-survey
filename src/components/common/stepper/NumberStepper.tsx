import styles from './number-stepper.module.scss';
import { useEffect, useState } from 'react';
import { PlusCircle, MinusCircle } from 'react-feather';
import { DO_NOTHING } from '../../../utils/jsUtils';

export type NumberStepperProps = {
    onChange: (newValue: number) => void;
    initialValue?: number;
    step?: number;
    min?: number;
    max?: number;
    className?: string;
    style?: object;
    iconSize?: number;
};

const NumberStepper = ({
                           initialValue = 0,
                           step = 1,
                           min = 1,
                           max = 10,
                           className = '',
                           style = {},
                           onChange = DO_NOTHING,
                           iconSize = 20,
                       }: NumberStepperProps) => {
    const [currValue, setCurrValue] = useState(initialValue);

    const createUpdateFn = (factor = 1) => () => {
        const upd = (currValue + (step * factor));
        const newValue = ((upd > max) || (upd < min)) ? currValue : upd;
        setCurrValue(newValue);
        onChange(newValue);
    };

    const increment = createUpdateFn();
    const decrement = createUpdateFn(-1);

    return (
        <div className={`${styles.numberStepper} ${className}`}>
            <div className={`${styles.decrement} ${currValue === min ? styles.disabled : ''}`}>
                <MinusCircle
                    width={iconSize}
                    height={iconSize}
                    onClick={() => { currValue === min ? DO_NOTHING() : decrement(); }}
                />
            </div>
            <div className={styles.currValue}>{currValue}</div>
            <div className={`${styles.increment} ${currValue === max ? styles.disabled : ''}`}>
                <PlusCircle
                    width={iconSize}
                    height={iconSize}
                    onClick={() => { currValue === max ? DO_NOTHING() : increment(); }} />
            </div>
        </div>
    );
};

export default NumberStepper;
