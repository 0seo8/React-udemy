import React, {useState} from 'react';
import Card from '../UI/Card';
import './IngredientForm.css';

interface ingredient {
    title: string,
    amount: string
}

const IngredientForm: React.FC<{onAddIngredient:(ingredient:ingredient) => void}> = React.memo(props => {
  const [inputState, setInputState] = useState({
    title: '',
    amount: ''
  })
  const submitHandler = (event : React.FormEvent)=> {
    event.preventDefault();
    props.onAddIngredient({
      title: inputState.title,
      amount: inputState.amount
    })
  };

  const changeInputValueHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const {value, name} = event.currentTarget
    setInputState({
      ...inputState,
      [name] : value
    })
  }

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" name='title' id="title" value={inputState.title} onChange={changeInputValueHandler}/>
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" name="amount" id="amount" value={inputState.amount} onChange={changeInputValueHandler}/>
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
