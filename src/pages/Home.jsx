import React, { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { Container, Row, Col } from 'react-bootstrap'
import { FilterCategory } from '../components/FilterCategory'
import { Products } from '../components/Products'
import categoryContext from '../contexts/categoryContext'
import cartContext from '../contexts/cartContext'
import searchContext from '../contexts/searchContext'
import addToCartContext from '../contexts/addToCartContext'
export const Home = () => {
  const category = useState(null)
  const cart = useState(0)
  const searchItem = useState('')
  const addToCart = useState(0)

  return (
    <div>
      <addToCartContext.Provider value={addToCart}>
      <searchContext.Provider value={searchItem}>
        <cartContext.Provider value={cart}>
          <Navbar />
          <Container>
            <p className='header-p'>
              {' '}
              الرئسية <strong>&gt;</strong> القهوة{' '}
            </p>
            <h1> جميع منتجات القهوة</h1>
            <categoryContext.Provider value={category}>
              <FilterCategory />
              <Products />
            </categoryContext.Provider>
          </Container>
        </cartContext.Provider>
      </searchContext.Provider>
      </addToCartContext.Provider>
    </div>
  )
}
