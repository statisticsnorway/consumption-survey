import { simpleFormat } from '../../utils/dateUtils';

const ConsumptionList = ({ consumptionList, noItemsText = 'Ingen registreringer endå' }) => {
    if (consumptionList && Array.isArray(consumptionList)) {
        const rows = consumptionList.map(c => (
            <tr className="singleConsumption">
                <td className={`type type--${c.type}`}>{c.type === 'shop' ? <ShoppingCart width={15}/> : <Umbrella width={15}/>}</td>
                <td className="date">{simpleFormat(c.date)}</td>
                <td className="source">{c.source}</td>
                <td className="amount">{Number.parseFloat(c.amount).toFixed(2)}</td>
            </tr>
        ));

        return (
            <div className="workspace" style={{ width: '100%' }}>
                <div className="workspace-panel list-items-panel">
                    <table className="consumptionsTable">
                        {rows}
                    </table>
                </div>
            </div>
        );
    }

    return (
        <table>
            <tr>
                <td>{noItemsText}</td>
            </tr>
        </table>
    );
};

export default ConsumptionList;