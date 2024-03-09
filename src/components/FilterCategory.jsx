import React, { useContext, useState } from 'react'
import { getProduct } from '../hooks/getProduct'
import categoryContext from '../contexts/categoryContext'
import CancelIcon from '@mui/icons-material/Cancel'

export const FilterCategory = () => {
  const seen = {}
  const uniqueItems = []
  const { data, isPending, error } = getProduct()
  const [selectedCategory, setSelectedCategory] = useContext(categoryContext)

  return (
    <div className='filter'>
      {error && <div>Error in server </div>}
      <div className='filter-board'>
        {data && (
          <p
            className={selectedCategory === null ? 'selected' : ''}
            onClick={() => setSelectedCategory(null)}
          >
            {' '}
            الكل
            {selectedCategory === null ? (
              <CancelIcon
                className='cancel-icon'
                onClick={(e) => {
                  e.stopPropagation() // prevent the parent onClick from being triggered
                  setSelectedCategory(null) // update the state to remove the selected category
                }}
              />
            ) : (
              ''
            )}
          </p>
        )}

        {data &&
          data.map((item) => {
            if (
              !seen[item.category_name_ar] &&
              item.category_name_ar.trim() !== ''
            ) {
              seen[item.category_name_ar] = true
              uniqueItems.push(item)

              return (
                <p
                  onClick={() => setSelectedCategory(item.category_slug)}
                  key={item.id}
                  className={
                    selectedCategory === item.category_slug ? 'selected' : ''
                  }
                >
                  {item.category_name_ar}
                  {selectedCategory === item.category_slug ? (
                    <CancelIcon
                      className='cancel-icon'
                      onClick={(e) => {
                        e.stopPropagation() // prevent the parent onClick from being triggered
                        setSelectedCategory(null) // update the state to remove the selected category
                      }}
                    />
                  ) : (
                    ''
                  )}
                </p>
              )
            }
            return null
          })}
      </div>
    </div>
  )
}
