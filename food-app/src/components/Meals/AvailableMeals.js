import React from 'react'
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem'
import DUMMY_MEALS from './dummy-meal'
import classes from './MealsSummary.module.css'

function AvailableMeals(props) {
  const mealList = DUMMY_MEALS.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ))

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  )
}

export default AvailableMeals
