import React, { useContext, useEffect, useMemo, useRef } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import image from '../assets/Icon.png'
import Badge from '@mui/material/Badge'
import SearchIcon from '@mui/icons-material/Search'
import CancelIcon from '@mui/icons-material/Cancel'
import cartContext from '../contexts/cartContext'
import searchContext from '../contexts/searchContext'
import debounce from 'lodash.debounce'
import addToCartContext from '../contexts/addToCartContext'
export const Navbar = () => {
  const [cartCount] = useContext(cartContext)
  const [searchItem, setSearchItem] = useContext(searchContext)
  const inputRef = useRef(null)
  const [addToCart, setAddToCart] = useContext(addToCartContext)

  const handleChange = (e) => {
    setSearchItem(e.target.value)
  }

  const debouncedResults = useMemo(() => {
    return debounce(handleChange, 500)
  }, [])

  useEffect(() => {
    if (searchItem === '') {
      debouncedResults.cancel()
    }
    return () => {
      debouncedResults.cancel()
    }
  }, [debouncedResults])

  const cancelBottom = () => {
    setSearchItem('')
    if (inputRef.current) {
      inputRef.current.value = '' // Clear the input value
    }
  }

  console.log(searchItem)

  return (
    <Container>
      <Row id='nav'>
        <Col sm={2} className='logo'>
          <Badge
            badgeContent={addToCart}
            color='success'
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <img src={image} alt='' />
          </Badge>
        </Col>
        <Col sm={10}>
          <Row className=''>
            <Col sm={10} className='search-bar'>
              <div className='search'>
                {searchItem === '' ? (
                  ''
                ) : (
                  <button onClick={cancelBottom}>
                    <CancelIcon />
                  </button>
                )}

                <input type='text' onChange={debouncedResults} ref={inputRef} />
                <SearchIcon />
              </div>
            </Col>
            <Col sm={2}></Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
