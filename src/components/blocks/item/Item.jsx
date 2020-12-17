import { MinusCircle, PlusCircle } from 'react-feather'
import { Input } from '@statisticsnorway/ssb-component-library'
import styles from './item.module.scss'
import { useEffect, useState } from 'react'
import Autocomplete from 'react-autocomplete'
import purchaseStyles from '../../../pages/consumption/purchases.module.scss'

import { useCoicopSearch } from '../../../hocs/coicop'

export default function Item({ item: purchaseItem, updateItem, removeItem }) {
  const [item, setItem] = useState(purchaseItem)

  const {
    coicopSearchTerm,
    setCoicopSearchTerm,
    coicopEntries,
    loading,
    error,
  } = useCoicopSearch()
  const [itemName, setItemName] = useState(purchaseItem.name)
  const [itemAmount, setItemAmount] = useState('')
  const [itemPrice, setItemPrice] = useState('')

  useEffect(() => {
    if (
      item.name !== purchaseItem.name ||
      item.amount !== purchaseItem.amount ||
      item.price !== purchaseItem.price
    ) {
      updateItem(purchaseItem, item)
    }
  }, [item])

  useEffect(() => {
    setItem(purchaseItem)
  }, [purchaseItem])

  return (
    <div className={styles.itemComponent} style={{ display: 'inline-flex' }}>
      <div style={{ marginRight: '10px', flex: '3' }}>
        <div
          id='name'
          className={styles.inputBlock}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <MinusCircle
            style={{ width: '20%', color: 'red' }}
            size='14'
            onClick={() => {
              removeItem(item)
            }}
          />

          <Autocomplete
            id='itemName'
            value={itemName}
            wrapperStyle={{ position: 'relative', width: '100%' }}
            onChange={(e, value) => {
              setCoicopSearchTerm(value)
              setItemName(value)
            }}
            renderInput={(props) => (
              <input
                placeholder='Skriv inn vare'
                {...props}
                style={{
                  padding: '0',
                  height: '44px',
                  width: '100%',
                  paddingRight: '0',
                }}
              />
            )}
            items={coicopEntries}
            renderMenu={(items, value, style) =>
              items && items.length > 0 && itemName ? (
                <div className={purchaseStyles.coicopItems} children={items} />
              ) : (
                <></>
              )
            }
            shouldItemRender={(item, value) =>
              item.text.toLowerCase().indexOf(value.toLowerCase()) > -1
            }
            renderItem={(item, highlighted) => (
              <div className={purchaseStyles.coicopItemName}>{item.text}</div>
            )}
            onSelect={(value) => {
              setItemName(value)
              setItem({ ...item, name: value })
            }}
            getItemValue={(item) => {
              return item.text
            }}
          />
        </div>
      </div>
      <div style={{ marginRight: '10px', flex: '1.5' }}>
        <div
          id='amount'
          className={`${styles.inputBlock} ${styles.amountInputBlock}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          <MinusCircle
            onClick={() => {
              setItem({ ...item, amount: item.amount - 1 })
            }}
            style={{ width: '100%' }}
            size='14'
          />
          <div style={{}}>
            <Input
              value={item.amount}
              handleChange={(val) => {
                setItem({ ...item, amount: val })
              }}
              type='number'
              placeholder={'0'}
            />
          </div>
          <PlusCircle
            onClick={() => {
              setItem({ ...item, amount: item.amount + 1 })
            }}
            style={{ width: '100%' }}
            size='14'
          />
        </div>
      </div>
      <div style={{ flex: '1.5' }}>
        <div
          id='price'
          className={`${styles.inputBlock} ${styles.amountInputBlock}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          <Input
            value={item.price}
            handleChange={(val) => {
              setItem({ ...item, price: val })
            }}
            type='number'
            placeholder='Beløp'
          />
        </div>
      </div>
    </div>
  )
}
