import { ReactNode, useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'react-feather';
import { DO_NOTHING } from '../../../utils/jsUtils';

export type AccordionProps = {
    title: string | ReactNode;
    open?: boolean;
    children: ReactNode;
    className?: string;
    onClick?: (currState: boolean) => void;
};

const Accordion = ({title, open = false, children, className = '', onClick = DO_NOTHING}: AccordionProps) => {
    const [isOpen, setIsOpen] = useState<boolean>();
    const [childComp, setChildComp] = useState<ReactNode>();

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    /** ensure changes in children re-render the accordion content too ! */
    useEffect(() => {
        setChildComp(children);
    }, [children]);

    return (
        <div className={`ssb-accordion ${className}`}>
            <div
                className={`accordion-header ${isOpen ? 'open' : 'closed'}`}
                onClick={() => { (onClick === DO_NOTHING) ? setIsOpen(!isOpen) : onClick(!isOpen); }}
            >
                <div className="header-text">{title}</div>
                {isOpen ?
                    <ChevronUp width={20} height={20} className="expand-icon"/> :
                    <ChevronDown width={20} height={20} className="expand-icon"/>
                }
            </div>
            {isOpen &&
            <div className={`accordion-body ${isOpen ? 'open' : 'cloased'}`}>
                {childComp}
            </div>
            }
        </div>
    );
};

export default Accordion;
