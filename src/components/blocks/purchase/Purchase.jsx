import { useState } from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import TimePicker from 'rc-time-picker'
import {
  Input,
  Checkbox,
  Divider,
  Text,
} from '@statisticsnorway/ssb-component-library'
import moment from 'moment'

import styles from '../../../pages/consumption/purchases.module.scss'
import Item from '../item/Item'

const timeStyle = {
  border: '0',
  fontSize: '2rem',
}

export default function Purchase() {
  const [date, setDate] = useState(moment(Date.now()).format('DD MMM'))
  const [time, setTime] = useState(moment(Date.now()))
  const [store, setStore] = useState('Narvesen')
  const [items, setItems] = useState([{ id: 1 }, { id: 2 }, { id: 3 }])
  const [regularExpendature, setRegularExpendature] = useState(false)

  return (
    <div>
      <Checkbox
        value={'regularexp'}
        callback={() => setRegularExpendature(!regularExpendature)}
        selected={regularExpendature}
      >
        Fast utgift
      </Checkbox>
      <Divider />
      <div className={styles.addPurchaseForm}>
        <div style={{ display: 'inline-flex' }}>
          <div className={styles.timeInput}>
            <label style={{ display: 'block' }} htmlFor='day'>
              Dag
            </label>
            <DayPickerInput
              formatDate={(date) => moment(date).format('DD MMM')}
              id='day'
              value={date}
              onDayChange={(day) => {
                setDate(day)
              }}
            />
          </div>
          <div className={styles.timeInput}>
            <label style={{ display: 'block' }} htmlFor='time'>
              Klokkeslett
            </label>
            <TimePicker
              id='time'
              value={time}
              onChange={(val) => setTime(val)}
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
          className={`${styles.marginTop10} ${styles.marginBottom10}`}
          value={store}
          handleChange={(val) => setStore(val)}
        />
        <Divider />
        <div style={{ display: 'flex' }}>
          <div style={{ flex: '1' }}>
            <Text>Vare</Text>
          </div>
          <div style={{ flex: '1' }}>
            <Text>Antall</Text>
          </div>
          <div style={{ flex: '1' }}>
            <Text>Beløp</Text>
          </div>
        </div>
        <Item />
        {items.map((item) => (
          <Item />
        ))}
      </div>
    </div>
  )
}
