import { useState } from 'react'
import Loader from '../components/common/Loader'

export const useLoader = () => {
  const [loading, setLoading] = useState(false)
  return { loading, setLoading }
}
