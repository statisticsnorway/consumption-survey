import Instructions, { InstructionStep } from './Instructions';
import { useState } from 'react';
import Accordion from '../common/accordion/Accordion';

export type InstallInstructionsProps = {
    headerTextOpen: string;
    headerTextClosed: string;
    instructions: InstructionStep[];
};

const InstallInstructions = ({headerTextClosed, headerTextOpen, instructions}: InstallInstructionsProps) => {
    const [isOpen, setIsOpen] = useState<boolean>();

    return (
        <Accordion
            open={isOpen} onClick={setIsOpen}
            title={isOpen ? headerTextOpen : headerTextClosed} className="install-instructions"
        >
            <Instructions steps={instructions}/>
        </Accordion>
    );
};

export default InstallInstructions;
