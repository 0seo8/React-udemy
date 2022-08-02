import React from 'react'
import DUMMY_MEALS from './dummy-meal'
import classes from './MealsSummary.module.css'

function AvailableMeals(props) {
  const mealList = DUMMY_MEALS.map((meal) => <li>{meal.name}</li>)

  return (
    <section className={classes.meals}>
      <ul>{mealList}</ul>
    </section>
  )
}

export default AvailableMeals
