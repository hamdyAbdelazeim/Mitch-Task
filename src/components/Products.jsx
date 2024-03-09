import React, { useContext, useState } from 'react'
import { getCategory } from '../hooks/getCategory '
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import categoryContext from '../contexts/categoryContext'
import { Circles } from 'react-loader-spinner'
import cartContext from '../contexts/cartContext'
import searchContext from '../contexts/searchContext'
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { AddToCard } from './AddToCard'
import addToCartContext from '../contexts/addToCartContext'
export const Products = () => {
  const [cartCount, setCartCount] = useContext(cartContext)
  const [searchItem] = useContext(searchContext)
  const [itemsNumber, setItemsNumber] = useState(1)
  const [categoryChoose] = useContext(categoryContext)
  const { data, isPending, error, hasMoreItems } = getCategory(
    categoryChoose,
    itemsNumber,
    searchItem
  )
  const [addToCart, setAddToCart] = useContext(addToCartContext)
  const [addedToCartMap, setAddedToCartMap] = useState({})

  const handleAddToCartAction = (id) => {
    setAddedToCartMap((prevState) => ({
      ...prevState,
      [id]: true,
    }))
    setAddToCart(addToCart + 1)
  }

  return (
    <div className='products'>
      {isPending && (
        <div className='loading'>
          <Circles
            height='80'
            width='80'
            color='#EDC843'
            ariaLabel='circles-loading'
            wrapperStyle={{}}
            wrapperClass=''
            visible={true}
          />
        </div>
      )}
      {error && <div>Error in server </div>}
      <Container>
        <Row xs={1} sm={1} md={3} lg={4} className='g-4'>
          {data &&
            data.map((item) => (
              <Col key={item.id}>
                <div className='product'>
                  <div className='product-head'>
                    <div className='product-img-container'>
                      <img
                        src={
                          item.images && item.images.length > 0
                            ? item.images[0]
                            : 'https://via.placeholder.com/150'
                        }
                        alt={item.name}
                      />
                    </div>
                    <div className='product-zoom-container'>
                      <div className='zoom-icon-container'>
                        <ZoomOutMapIcon />{' '}
                      </div>
                      <div className='zoom-div'></div>
                    </div>
                  </div>
                  <div className='product-info'>
                    <p className='product-name'>{item.ar_name}</p>
                    <p className='price'>
                      <span className='old-price'>
                        EGP <span>50</span> 99
                      </span>
                      <span className='new-price'>
                        EGP{' '}
                        <span className='big-price'>{item.price || '50'}</span>{' '}
                        99
                      </span>
                    </p>

                    <div className='buttons'>
                      {addedToCartMap[item.id] ? (
                        <AddToCard />
                      ) : (
                        <button
                          className='button-cart'
                          onClick={() => handleAddToCartAction(item.id)}
                        >
                          اضف الى السلة
                        </button>
                      )}
                      <button className='button-icon' >
                        <FavoriteIcon className='love-btn' />
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
        </Row>
      </Container>
      <Container className='show-more-container'>
        <Row>
          <Col></Col>
          <Col xs={9} className='show-more'>
            {hasMoreItems && (
              <button
                className={'btn btn-warning' && 'show-more-button'}
                onClick={() => setItemsNumber(itemsNumber + 1)}
              >
                عرض المزيد
              </button>
            )}
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  )
}
