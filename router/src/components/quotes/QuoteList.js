import { Fragment } from 'react'

import QuoteItem from './QuoteItem'
import classes from './QuoteList.module.css'

const QuoteList = (props) => {
  const changeSoringHandler = (a, b) => {
    return props.quotes((a, (b) => a - b))
  }
  return (
    <Fragment>
      <div className={StyleSheet.sorting}>
        <button onClikc={changeSoringHandler}> Sort ASD</button>
      </div>
      <ul className={classes.list}>
        {props.quotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  )
}

export default QuoteList
