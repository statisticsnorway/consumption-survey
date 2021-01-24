import { ReactNode } from 'react';

import styles from './instructions.module.scss';

export type InstructionStep = {
    text: string;
    figure?: ReactNode;
};

export type InstructionsProps = {
    steps: InstructionStep[];
};

const Instructions = ({steps = []}: InstructionsProps) => {
    return (
        <div className={styles.instructions}>
            {steps.map((step, idx) => (
                <div className={styles.instructionStep}>
                    <div className={styles.stepNr}>{idx}</div>
                    <div className={styles.text}>{step.text}</div>
                    <div className={styles.figure}>{step.figure}</div>
                </div>
            ))}
        </div>
    );
};

export default Instructions;
