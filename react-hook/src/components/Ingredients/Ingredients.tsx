import React, { useState, useEffect, useCallback } from 'react'
// import axios from 'axios'

import IngredientForm from './IngredientForm'
import IngredientList from './IngredientList'
import ErrorModal from '../UI/ErrorModal'
import Search from './Search'

interface ingredient {
  id?: string
  title: string
  amount: string
}

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState<ingredient[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const filteredIngredientsHandler = useCallback(
    (filteredIngredients: ingredient[]) => {
      setUserIngredients(filteredIngredients)
    },
    [],
  )

  const addIngredientHandler = (ingredient: ingredient) => {
    setIsLoading(true)
    fetch(
      'https://react-hooks-update-9a96f-default-rtdb.firebaseio.com/ingredients.json',
      {
        method: 'POST',
        body: JSON.stringify(ingredient),
        headers: { 'Content-Type': 'application/json' },
      },
    )
      .then((response) => {
        setIsLoading(false)
        return response.json()
      })
      .then((responseData) => {
        setUserIngredients((prevIngredients) => [
          ...prevIngredients,
          { id: responseData.name, ...ingredient },
        ])
      })
  }

  const removeIngredientHanler = (ingredientId: string) => {
    setIsLoading(true)
    fetch(
      `https://react-hooks-update-9a96f-default-rtdb.firebaseio.com/ingredients/${ingredientId}.jsn`,
      {
        method: 'DELETE',
      },
    )
      .then((response) => {
        setIsLoading(false)
        setUserIngredients((prevIngredients) =>
          prevIngredients.filter(
            (ingredient) => ingredient.id !== ingredientId,
          ),
        )
      })
      .catch((error) => {
        setError(error.message)
        setIsLoading(false)
      })
  }

  const clearError = () => {
    setError(null)
  }
  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />
      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHanler}
        />
      </section>
    </div>
  )
}

export default Ingredients
