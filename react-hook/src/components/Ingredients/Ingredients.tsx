import React, { useState, useEffect, useCallback } from 'react'
// import axios from 'axios'

import IngredientForm from './IngredientForm'
import IngredientList from './IngredientList'
import Search from './Search'

interface ingredient {
  id?: string
  title: string
  amount: string
}

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState<ingredient[]>([])

  const filteredIngredientsHandler = useCallback(
    (filteredIngredients: ingredient[]) => {
      setUserIngredients(filteredIngredients)
    },
    [],
  )

  const addIngredientHandler = (ingredient: ingredient) => {
    fetch(
      'https://react-hooks-update-9a96f-default-rtdb.firebaseio.com/ingredients.json',
      {
        method: 'POST',
        body: JSON.stringify(ingredient),
        headers: { 'Content-Type': 'application/json' },
      },
    )
      .then((response) => {
        return response.json()
      })
      .then((responseData) => {
        setUserIngredients((prevIngredients) => [
          ...prevIngredients,
          { id: responseData.name, ...ingredient },
        ])
      })
  }
  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={userIngredients} onRemoveItem={() => {}} />
      </section>
    </div>
  )
}

export default Ingredients
