import { useContext } from 'react'

import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import addToCartContext from '../contexts/addToCartContext'
export const AddToCard = () => {
  const [addToCart, setAddToCart] = useContext(addToCartContext)
  console.log(addToCart)
  const increaseCart = () => {
    setAddToCart(addToCart + 1)
  }
  const decreaseCart = () => {
    if (addToCart > 0) {
      setAddToCart(addToCart - 1)
    }
  }
  return (
    <div className='addToCart-container '>
      <button className='inc-btn' onClick={increaseCart}>
        <AddIcon />
      </button>
      <div className='cartResult'>{addToCart}</div>
      <button className='dec-btn' onClick={decreaseCart}>
        <RemoveIcon />
      </button>
    </div>
  )
}
