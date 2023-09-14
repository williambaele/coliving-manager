import { BillsContext } from '../context/BillContext'
import { useContext } from 'react'

export const useBillsContext = () => {
  const context = useContext(BillsContext)

  if (!context) {
    throw Error('useLinksContext must be used inside an LinksContextProvider')
  }

  return context
}


