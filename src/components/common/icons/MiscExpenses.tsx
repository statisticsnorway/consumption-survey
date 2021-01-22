import { IconProps } from './iconTypes';

export type MiscExpensesProps = IconProps & {};

const MiscExpenses = ({width = 20, height = 20}: MiscExpensesProps) => {
    return (
        <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12 4H6.25C5.91848 4 5.60054 4.12643 5.36612 4.35147C5.1317 4.57652 5 4.88174 5 5.2V14.8C5 15.1183 5.1317 15.4235 5.36612 15.6485C5.60054 15.8736 5.91848 16 6.25 16H13.75C14.0815 16 14.3995 15.8736 14.6339 15.6485C14.8683 15.4235 15 15.1183 15 14.8V7L12 4Z"
                stroke="#274247" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11 4V8H15" stroke="#274247" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 13L8 13" stroke="#274247" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 10L8.5 10L8 10" stroke="#274247" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round"/>
        </svg>
    );
};

export default MiscExpenses;
