import React, {useState} from 'react';
// import axios from 'axios'

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
    // axios('https://react-hooks-update-9a96f-default-rtdb.firebaseio.com/ingredients.json', {
    //   method:'post',
    //   headers: {'Content-Type': 'application/json'},
    //   data: JSON.stringify(ingredient)
    // }).then(response => {
    //   setUserIngredients(prevIngredients => [
    //     ...prevIngredients, 
    //     { id: response.data.name, ...ingredient}
    //   ])
    // })

    fetch('https://react-hooks-update-9a96f-default-rtdb.firebaseio.com/ingredients.json', {
      method:'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      return response.json()
    }).then(responseData => {
      setUserIngredients(prevIngredients => [
        ...prevIngredients, 
        { id: responseData.name, ...ingredient}
      ])
    })
  }
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
