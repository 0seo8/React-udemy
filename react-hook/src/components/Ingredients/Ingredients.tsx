import React, { useState, useEffect } from 'react'
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

  //모든 컴포넌트의 렌더잉이 끝난 후 실행됩니다.렌더링이 될때마다.
  useEffect(() => {
    fetch(
      'https://react-hooks-update-9a96f-default-rtdb.firebaseio.com/ingredients.json',
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
        setUserIngredients(loadedIngredients)
      })
  }, [])

  const filteredIngredientsHandler = (filteredIngredients: ingredient[]) => {
    setUserIngredients(filteredIngredients)
  }

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
