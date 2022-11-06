import React, { useState, useEffect, useCallback } from 'react'

import Card from '../UI/Card'
import './Search.css'

interface ingredient {
  title: string
  amount: string
}

const Search: React.FC<{
  onLoadIngredients: (loadedIngredients: ingredient[]) => void
}> = React.memo(({ onLoadIngredients }) => {
  const [enteredFilter, setEnteredFilter] = useState('')

  useEffect(() => {
    const query =
      enteredFilter.length === 0
        ? ''
        : `?orderBy="title"&equalTo="${enteredFilter}"`
    fetch(
      'https://react-hooks-update-9a96f-default-rtdb.firebaseio.com/ingredients.json' +
        query,
    )
      .then((response) => response.json())
      .then((responseData) => {
        const loadedIngredients = []
        for (const key in responseData) {
          loadedIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount,
          })
        }
        onLoadIngredients(loadedIngredients)
      })
  }, [enteredFilter, onLoadIngredients])

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
            value={enteredFilter}
            onChange={(event) => setEnteredFilter(event.target.value)}
          />
        </div>
      </Card>
    </section>
  )
})

export default Search
