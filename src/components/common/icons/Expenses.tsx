import { IconProps } from './iconTypes';

export type ExpensesProps = IconProps & {};

const Expenses = ({width = 20, height = 20}: ExpensesProps) => {
    return (
        <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="14" r="2" stroke="#274247" stroke-width="2"/>
            <path
                d="M15 14C15.3643 14 15.7058 13.9026 16 13.7324C16.5978 13.3866 17 12.7403 17 12C17 10.8954 16.1046 10 15 10C13.8954 10 13 10.8954 13 12"
                stroke="#274247" stroke-width="2" stroke-linecap="round"/>
            <path d="M7 10L5 10" stroke="#274247" stroke-width="2" stroke-linecap="round"/>
            <path
                d="M14 7V5.125C14 4.50368 13.5116 4 12.9091 4H3.09091C2.48842 4 2 4.50368 2 5.125V11.875C2 12.4963 2.48842 13 3.09091 13H7"
                stroke="#274247" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 7L14 7" stroke="#274247" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

    );
};

export default Expenses;
