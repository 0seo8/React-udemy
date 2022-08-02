import React from 'react'
import HeaderCardButton from './HeaderCardButton'
import mealsImage from '../../assets/meals.jpg'
import classes from './Header.module.css'
function Header(props) {
  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCardButton>Cart</HeaderCardButton>
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </>
  )
}

export default Header