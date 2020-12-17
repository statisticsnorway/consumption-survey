import { simpleFormat } from '../../utils/dateUtils'
import styles from './purchases.module.scss'

const ConsumptionList = ({
  consumptionList,
  noItemsText = 'Ingen registreringer endå',
}) => {
  if (consumptionList && Array.isArray(consumptionList)) {
    const rows = consumptionList.map((c) => (
      <tr className='singleConsumption'>
        <td className={`type type--${c.type}`}>{c.store}</td>
        <td className='date'>{simpleFormat(c.dateOfPurchase)}</td>
        <td className='amount'>{Number.parseFloat(c.totalSum).toFixed(2)}</td>
      </tr>
    ))

    return (
      <div className='workspace' style={{ width: '100%' }}>
        <div className={`${styles.purchaseTable}`}>
          <table className='consumptionsTable'>{rows}</table>
        </div>
      </div>
    )
  }

  return (
    <table>
      <tr>
        <td>{noItemsText}</td>
      </tr>
    </table>
  )
}

export default ConsumptionList
