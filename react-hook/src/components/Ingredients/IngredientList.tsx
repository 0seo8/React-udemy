import React from 'react'

import './IngredientList.css'
interface ingredient {
  id?: string
  title: string
  amount: string
}
const IngredientList: React.FC<{
  ingredients: ingredient[]
  onRemoveItem: (ingredientId: string) => void
}> = ({ ingredients, onRemoveItem }) => {
  return (
    <section className="ingredient-list">
      <h2>Loaded Ingredients</h2>
      <ul>
        {ingredients.map((ig) => (
          <li key={ig.id} onClick={() => onRemoveItem(ig.id!)}>
            <span>{ig.title}</span>
            <span>{ig.amount}x</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default IngredientList
