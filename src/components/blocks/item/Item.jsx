import { MinusCircle, PlusCircle } from 'react-feather'
import { Input } from '@statisticsnorway/ssb-component-library'

export default function Item({ item }) {
  return (
    <div style={{ display: 'inline-flex' }}>
      <div style={{ flex: '1' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <MinusCircle />
          <Input placeholder='Vare' />
        </div>
      </div>
      <div style={{ flex: '1' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <MinusCircle />
          <Input placeholder='Antall' />
          <PlusCircle />
        </div>
      </div>
      <div style={{ flex: '1' }}>
        <Input placeholder='Beløp' />
      </div>
    </div>
  )
}
