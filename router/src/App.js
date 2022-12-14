import { Routes, Route } from 'react-router-dom'
import AllQuotes from './pages/AllQuotes'
import QuoteDetail from './pages/QuoteDetail'
import NewQuote from './pages/NewQuote'
import Layout from './components/layout/Layout'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path={'/quotes'} element={<AllQuotes />} />
        {/* <Route path={'quote-detail'} element={<QuoteDetail />} /> */}
        <Route path={'/:quotedId'} element={<QuoteDetail />} />
        <Route path={'/new-quote'} element={<NewQuote />} />
      </Routes>
    </Layout>
  )
}

export default App
