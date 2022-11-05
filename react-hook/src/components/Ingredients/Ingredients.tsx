import React, {useState} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

interface ingredient {
  id?: string,
  title: string,
  amount: string
}

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState<ingredient[]>([])
  const addIngredientHandler = (ingredient: ingredient) => {
    setUserIngredients(prevIngredients => [
      ...prevIngredients, 
      {
        id: Math.random().toString(),
        ...ingredient
      }
    ]
  )}
  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler}/>

      <section>
        <Search />
        <IngredientList ingredients={userIngredients} onRemoveItem={() =>{}}/>
      </section>
    </div>
  );
}

export default Ingredients;
