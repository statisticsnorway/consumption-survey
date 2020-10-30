import styles from './styles/workspace.module.scss'
import { createContext, useState } from 'react'

//import consumptionList from '../../mock/consumption';

export const WorkspaceContext = createContext({})

const Workspace = ({ children }) => {
  const [purchases, setPurchases] = useState([])
  const addPurchase = (purchase) => {
    setPurchases([purchase, ...purchases])
  }
  return (
    <div className={styles.workspace}>
      <WorkspaceContext.Provider value={{ purchases, addPurchase }}>
        {children}
      </WorkspaceContext.Provider>
    </div>
  )
}

export const WorkspacePanel = ({ children }) => (
  <div className={styles.workspacePanel}>{children}</div>
)

export default Workspace
