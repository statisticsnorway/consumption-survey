export type MiscExpensesProps = {
    width: number;
    height: number;
};

const MiscExpenses = ({ width = 20, height = 20}: MiscExpensesProps) => {
    return (
        <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="12" height="4" rx="2" stroke="#274247" stroke-width="2"/>
            <rect x="4" y="12" width="12" height="4" rx="2" stroke="#274247" stroke-width="2"/>
        </svg>
    );
};

export default MiscExpenses;
