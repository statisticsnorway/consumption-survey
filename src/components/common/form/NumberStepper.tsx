import { ReactNode, useEffect, useState } from 'react';
import { PlusCircle, MinusCircle } from 'react-feather';
import { DO_NOTHING } from '../../../utils/jsUtils';
import { DeleteConfirmProps } from '../../../uiConfig';

import styles from './numberStepper.module.scss';
// import DeleteConfirmDialog from '../dialog/DeleteConfirmDialog';

export type NumberStepperProps = {
    onChange: (newValue: number) => void;
    initialValue?: number;
    step?: number;
    min?: number;
    max?: number;
    className?: string;
    style?: object;
    iconSize?: number;
    deleteConfirmProps: DeleteConfirmProps,
};

const NumberStepper = ({
                           initialValue = 0,
                           step = 1,
                           min = 0,
                           max = 10,
                           className = '',
                           style = {},
                           onChange = DO_NOTHING,
                           iconSize = 20,
                           deleteConfirmProps,
                       }: NumberStepperProps) => {
    const [currValue, setCurrValue] = useState(initialValue);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>();

    const createUpdateFn = (factor = 1) => () => {
        const newValue = (currValue + (step * factor));
        setCurrValue(newValue);
        onChange(newValue);
    };

    const increment = createUpdateFn();
    const decrement = createUpdateFn(-1);

    const cleanupDeleteOperation = () => {
        setShowDeleteConfirm(false);
    };

    const onDeleteConfirm = () => {
        decrement();
        cleanupDeleteOperation();
    };

    const onDeleteCancel = () => {
        cleanupDeleteOperation();
    };

    /*
    {showDeleteConfirm &&
            <DeleteConfirmDialog
                show={showDeleteConfirm}
                onConfirm={onDeleteConfirm}
                onCancel={onDeleteCancel}
                leadingText={deleteConfirmProps.text}
                warningText={deleteConfirmProps.textWarning}
                info={deleteConfirmProps.entityInfo}
                confirmText={deleteConfirmProps.confirmText}
                cancelText={deleteConfirmProps.cancelText}
            />
            }
     */

    return (
        <div className={`${styles.numberStepper} ${className}`}>

            <div className={`${styles.decrement} ${currValue === min ? styles.danger : ''}`}>
                <MinusCircle
                    width={iconSize}
                    height={iconSize}
                    onClick={() => {
                        if (currValue === min) {
                            setShowDeleteConfirm(true);
                        } else {
                            decrement();
                        }
                    }}
                />
            </div>
            <div className={styles.currValue}>{currValue}</div>
            <div className={`${styles.increment} ${currValue === max ? styles.disabled : ''}`}>
                <PlusCircle
                    width={iconSize}
                    height={iconSize}
                    onClick={() => {
                        currValue === max ? DO_NOTHING() : increment();
                    }}/>
            </div>
        </div>
    );
};

export default NumberStepper;
