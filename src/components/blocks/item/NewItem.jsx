import { MinusCircle, PlusCircle } from 'react-feather'
import { Input } from '@statisticsnorway/ssb-component-library'
import styles from './item.module.scss'
import { useState } from 'react'
import Autocomplete from 'react-autocomplete'
import pstyles from '../../../pages/consumption/purchases.module.scss'

import { useCoicopSearch } from '../../../hocs/coicop'

export default function NewItem({ addItem }) {
  const [item, setItem] = useState({ name: '', amount: '', price: '' })

  const {
    coicopSearchTerm,
    setCoicopSearchTerm,
    coicopEntries,
    loading,
    error,
  } = useCoicopSearch()

  const checkIfComplete = (item) => {
    if (item.name && item.amount && item.price) {
      addItem(item)
      setItem({ name: '', amount: '', price: '' })
    }
  }

  return (
    <div className={styles.itemComponent} style={{ display: 'inline-flex' }}>
      <div style={{ marginRight: '10px', flex: '3' }}>
        <label
          style={{ fontSize: '0.8rem', display: 'block', color: 'gray' }}
          htmlFor='name'
        >
          Vare
        </label>

        <div
          id='name'
          className={styles.inputBlock}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Autocomplete
            id='itemName'
            value={item.name}
            wrapperStyle={{ position: 'relative', width: '100%' }}
            onChange={(e, value) => {
              setCoicopSearchTerm(value)
              setItem({ ...item, name: value })
            }}
            renderInput={(props) => (
              <input
                placeholder='Skriv inn ny vare'
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
              items && items.length > 0 && item.name ? (
                <div className={pstyles.coicopItems} children={items} />
              ) : (
                <></>
              )
            }
            shouldItemRender={(item, value) =>
              item.text.toLowerCase().indexOf(value.toLowerCase()) > -1
            }
            renderItem={(item, highlighted) => {
              return <div className={pstyles.coicopItemName}>{item.text}</div>
            }}
            onSelect={(value) => {
              setItem({ ...item, name: value })
            }}
            getItemValue={(item) => {
              return item.text
            }}
          />
        </div>
      </div>
      <div style={{ marginRight: '10px', flex: '1.5' }}>
        <label
          style={{ fontSize: '0.8rem', display: 'block', color: 'gray' }}
          htmlFor='amount'
        >
          Antall
        </label>

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
              setItem({ ...item, amount: Number(item.amount) - 1 })
            }}
            style={{ width: '100%' }}
            size='14'
          />
          <div style={{}}>
            <input
              style={{
                padding: '0',
                height: '44px',
                width: '100%',
                paddingRight: '0',
              }}
              value={item.amount}
              onChange={(event) => {
                setItem({ ...item, amount: Number(event.target.value) })
              }}
              type='number'
              placeholder='0'
            />
          </div>
          <PlusCircle
            onClick={() => {
              setItem({ ...item, amount: Number(item.amount) + 1 })
            }}
            style={{ width: '100%' }}
            size='14'
          />
        </div>
      </div>
      <div style={{ flex: '1.5' }}>
        <label
          style={{ fontSize: '0.8rem', display: 'block', color: 'gray' }}
          htmlFor='price'
        >
          Pris
        </label>

        <div
          id='price'
          className={`${styles.inputBlock} ${styles.amountInputBlock}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          <input
            onKeyPress={(event) => {
              if (event.key === 'Enter') checkIfComplete(item)
            }}
            style={{
              padding: '0',
              height: '44px',
              width: '100%',
              paddingRight: '0',
            }}
            value={item.price}
            onChange={(event) => {
              setItem({ ...item, price: Number(event.target.value) })
            }}
            type='number'
            placeholder='Beløp'
          />

          <PlusCircle
            onClick={() => {
              checkIfComplete(item)
            }}
            style={{ width: '100%', color: 'green' }}
            size='14'
          />
        </div>
      </div>
    </div>
  )
}
