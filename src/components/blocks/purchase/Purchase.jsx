import { useEffect, useState, useContext } from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import {
  Input,
  Checkbox,
  Divider,
  Button,
} from '@statisticsnorway/ssb-component-library'
import moment from 'moment'
import { useRouter } from 'next/router'

import styles from '../../../pages/consumption/purchases.module.scss'
import Item from '../item/Item'
import NewItem from '../item/NewItem'
import { WorkspaceContext } from '../../layout/Workspace'

export default function Purchase() {
  const router = useRouter()
  const [dateOfPurchase, setDateOfPurchase] = useState(
    moment(Date.now()).format('DD MMM')
  )
  const [store, setStore] = useState('')
  const [items, setItems] = useState([])
  const [regularExpendature, setRegularExpendature] = useState(false)
  const [totalSum, setTotalSum] = useState(0)

  const { purchases, addPurchase } = useContext(WorkspaceContext)

  const addItem = (item) => {
    setItems([{ ...item, created: Date.now() }, ...items])
  }
  const removeItem = (item) => {
    setItems(items.filter((i) => (i.name !== item.name ? true : false)))
  }
  const updateItem = (oldItem, newItem) => {
    setItems(
      items.map((i) =>
        i.name === oldItem.name ? { ...newItem, modified: Date.now() } : i
      )
    )
  }

  useEffect(() => {
    setTotalSum(
      items.reduce((acc, curr) => (curr.price ? acc + curr.price : acc), 0)
    )
  }, [items])
  useEffect(() => {
    console.log('PURCHASES', purchases)
  }, [purchases])

  return (
    <div>
      <div style={{ paddingLeft: '0.2rem' }}>
        <Checkbox
          value='regularExpendature'
          callback={() => setRegularExpendature(!regularExpendature)}
          selected={regularExpendature}
        >
          Fast utgift
        </Checkbox>
      </div>
      <Divider />
      <div className={styles.addPurchaseForm}>
        <div style={{ display: 'inline-flex' }}>
          <div className={styles.timeInput}>
            <label
              style={{ fontSize: '0.8rem', display: 'block', color: 'gray' }}
              htmlFor='day'
            >
              Dato
            </label>
            <DayPickerInput
              style={{ color: 'black' }}
              formatDate={(date) => moment(date).format('DD MMM')}
              id='day'
              value={dateOfPurchase}
              onDayChange={(day) => {
                setDateOfPurchase(day)
              }}
            />
          </div>
        </div>
        <label
          style={{ fontSize: '0.8rem', display: 'block', color: 'gray' }}
          htmlFor='store'
        >
          Butikk
        </label>
        <Input
          className={`${styles.marginBottom10}`}
          value={store}
          handleChange={(val) => setStore(val)}
          placeholder='Legg inn butikk'
        />
        <Divider />

        <NewItem addItem={addItem} />
        {items.map((item) => {
          return (
            <Item
              removeItem={removeItem}
              updateItem={updateItem}
              key={item.name}
              item={item}
            />
          )
        })}
        <div>
          <div
            className={styles.marginTop10}
            style={{ float: 'right', borderBottom: 'double' }}
          >{`Totalsum: ${totalSum}`}</div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '10px',
          }}
        >
          <Button
            primary
            type='submit'
            onClick={() => {
              addPurchase({
                dateOfPurchase,
                store,
                created: Date.now(),
                totalSum,
                regularExpendature,
                items,
              })
              router.push('/dashboard/Dashboard')
            }}
          >
            Lagre
          </Button>
          <Button
            onClick={() => {
              router.push('/dashboard/Dashboard')
            }}
            type='reset'
          >
            Avbryt
          </Button>
        </div>
      </div>
    </div>
  )
}
