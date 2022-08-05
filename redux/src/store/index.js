import { createStore } from 'react-redux'

const initialState = { count: 0, showCounter: true }

const couterReducer = (state = initialState, action) => {
  if (action.type === 'increment') {
    return {
      count: state.count + 1,
      showCounter: state.showCounter,
    }
  }

  if (action.type === 'increase') {
    return {
      count: state.count + action.amount,
      showCounter: state.showCounter,
    }
  }

  if (action.type === 'decrement') {
    return {
      count: state.count - 1,
      showCounter: state.showCounter,
    }
  }

  if (action.type === 'toggle') {
    return {
      showCounter: !state.showCounter,
      counter: state.counter,
    }
  }

  return state
}

const store = createStore(couterReducer)

export default store
