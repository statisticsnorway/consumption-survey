import Accordion from '../blocks/accordion/Accordion';
import Instructions, { InstructionStep } from './Instructions';
import { useState } from 'react';

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
