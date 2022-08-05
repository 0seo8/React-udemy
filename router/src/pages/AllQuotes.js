import React from 'react'
import QuoteList from '../components/quotes/QuoteList'
import DUMMY_QUOTES from '../constants/dummy'
import { Outlet } from 'react-router-dom'

function AllQuotes() {
  return (
    <>
      <QuoteList quotes={DUMMY_QUOTES}>All Quotes Pages</QuoteList>
      <Outlet />
    </>
  )
}

export default AllQuotes
