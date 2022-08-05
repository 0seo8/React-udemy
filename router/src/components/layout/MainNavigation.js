import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './MainNavigation.module.css'

function MainNavigation() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Greet Quotes</div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to={'/quotes'} activeclassname={styles.active}>
              All Quotes
            </NavLink>
          </li>
          <li>
            <NavLink to={'/new-quote'} activeclassname={styles.active}>
              Add a Quote
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default MainNavigation
