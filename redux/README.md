# Redux

- 리덕스란 크로스 컴포넌트 또는 앱 와이드 상태를 위한 **상태 관리시스템**

## 1. 상태 관리 시스템, 훅

- useSate
- useREducer
- 리덕스 등등

## 2. State의 종류

### 2-1. local state

- 데이터가 변경이 하나의 컴포넌트에 속하는 UI(ex) input창, togggle 버튼)
- `useState`로 관리를 하며 복잡한 로직이나 상태가 동시에 변경되는 위험성을 가지고 있는 경우 `useReducer`를 사용할 수 있다.

### 2-2. Cross-Component state

- 변화가 하나의 컴포넌트가 아니라 다수의 컴포넌트에 영향을 미치는 경우 (ex)오버레이, 모달)
- `useState`, 또는 `useReducer`로 관리가 가능하지만 `props`를 이용해 `props`체인을 구축해야합니다.

### 2-3. App-Wide state

- 다수의 컴포넌트가 아니라 어플리케이션 모든 컴포넌트에 영향을 미치는 경우 ex) 사용자 인증
- `useState`, 또는 `useReducer` 관리를 하며 props 전체 주변의 함수를 업데이트 하며 관리를 할 수 있습니다. (즉, `usState` or `useReducer` + 상태변화시키는 - props함수)
- 단 props를 통해 함수를 주고 받는 것은 매우 복잡하몀 예기치 못한 반응을 가져올 수 있기 때문에 context-api와 함께 사용을 하는 편입니다.
- 뿐만 아니라 **리덕스**를 이용하면 이러한 문제점을 쉽게 해결할 수가 있습니다.

## 3. Redux vs Reducer

- 이미 reducer가 있는데 왜 redux가 필요하지?

### 3-1 리액트 컨텍스트의 잠재적인 단점

- 설정 및 상태관리시스템이 매우 복잡해질 수 있습니다.

```jsx
//ex)
return (
  <AuthContextProvider>
    <ThemeContextProvider>
      <UIInteractionContextProvider>
        <MultiStepFormContextProvider>
          <UserRegistration />
        </MultiStepFormContextProvider>
      </UIInteractionContextProvider>
    </ThemeContextProvider>
  </AuthContextProvider>
)
```

- 데이터가 빈번하게 변경되는 경우 성능면에서 좋지 않다.(from 리액트 팀원)

> ※ 리액트 컨택스트 및 리덕스는 각각의 장점이 있기 때문에 어떤 것이 더 좋다 나쁘다라고 할 수 없습니다. 각각의 상황에 맞춰 내 프로젝트에 더 적합한 상태관리 시스템을 선택해서 사용을 하면 됩니다.(둘을 함께 사용할 수도 있습니다.)

## 4. 리덕스의 작동방식

- 어플리케이션에 단 하나의 저장소를 두고 데이터를 관리합니다.(중앙식데이터저장소)
- 컴포넌트가 store를 구독하며 데이터가 변경된 경우 화면에 반영합니다.
- **컴포넌트는 저장소에 있는 데이터를 직접적으로 변경하지 않습니다.**
  - 대신 Reducer이라는 함수를 이용합니다.
  - reuducer: dispatch / action: mutation

## 5. 리덕스 실행

**설치**

```sh
$ yarn add redux
```

**리듀서**

```js
import redux = require('redux')

const counterReducer = (state = {count: 0}, action) => {

  return {
    counter: state.counter + 1
  }
}

const store = redux.createStore(counterReducer)
```

- 리덕스는 자바스크립트 함수이지만 리덕스 라이브러리에 의해 호출되게 됩니다.
- 항상 2개의 입력과 2개의 파라미터 값을 가집니다.
  - inputs: state, action

**구독(sbuscribe)**

```js
const couterSubscriber = () => {
  const latestState = store.getState()
}

store.subscribe(couterSubscriber)
```

- getState의 경우 createStore로 저장된 저장소에서 사용을 할 수 있는 메소드입니다.
- getState의 경우 상태가 변경될 때마다 가장 최신상태를 줍니다.
- **action실행**

```js
store.dsipatch({ type: 'increment' })
```

**실제 예시**

```js
import redux = require('redux')

const counterReducer = (state = {count: 0}, action) => {
  if(action.type === 'increment' {
    return {
      counter: state.counter + 1
    }
  })

  if(action.type === 'decrement') {
    return {
      counter: state.counter - 1
    }
  }

  return state;
}

const store = redux.createStore(counterReducer)

store.dsipatch({ type: 'increment' })
store.dsipatch({ type: 'decrement' })
```

## 실습 1 리덕스에 리액스 적용

```sh
$ yarn add redux react-redux
```

redux는 리액트에서만 사용되는 것이 아니기 때문에 리덕스 스토어에 컴포넌트를 구독하는 react-redux도 함께 설치를 해줍니다.

## 실습 2 src > store > index.js 에 리덕스 로직을 작성해줍니다.

```js
import { createStore } from 'redux'

const couterReducer = (state = { count: 0 }, action) => {
  if (action.type === 'increment') {
    return {
      count: state.count + 1,
    }
  }

  if (action.type === 'decrement') {
    return {
      count: state.count - 1,
    }
  }

  return state
}

const store = createStore(couterReducer)

export default store
```

### 실습 3 스토어 제공하기

만든 스토어를 리액트를 제공합니다. 보통은 어플리케이션의 가장 높은 레벨인 index.js파일에 제공을 합니다.

`index.js`

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider } from 'react-redux'
import store from './store/index'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
)
```

### 실습 4 리액트 컴포넌트에서 리덕스 데이터 사용하기

- useStore 훅을 사용할수도 있지만, 스토어에 바로 접근 할 수 있는 useSelector가 더 편합니다.
- useStore은 자동으로 서브스크립션을 설정하고, 상태의 **일부**를 선택하게 해줍니다.
- 만약 함수컴포넌트가 아니라 클래스 컴포넌트에 적용을 하는 경우에는 `import {useSelector, connect} from 'react-redux'`두가지를 사용할 수 있습니다.

`counter.js`

```js
import { useSelector } from 'react-redux' ✅
import store from '../store'
import classes from './Counter.module.css'

const Counter = () => {
  const counter = useSelector((state) => store.cointer) ✅

  const toggleCounterHandler = () => {}

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div> ✅
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  )
}
```

### 실습 5. 내부컴포넌트에서 스토어의 액션을 dispatch하기

- react-redux의 `useDispatch`를 사용합니다.
- `useDispatch`를 호출하면 호출된 값에서 `dispatch`를 꺼내올 수 있습니다.
  - counter를 다루는 두개의 함수를 만들고 각 버튼과 연결해줍니다.

```jsx
import { useSelector, useDispatch } from 'react-redux'
import store from '../store'

const Counter = () => {
  const dispatch = useDispatch()
  const counter = useSelector((state) => store.cointer)

const incrementHandler = () => {
  dispatch({ type: 'increment' })
}

const decrementHandler = () => {
  dispatch({ type: 'decrement' })
}

return (
  ...
  <button onClick={incrementHandler}>Increment</button>
  <button onClick={decrementHandler}>Decrement</button>
)
```

### 실습 6 클래스 기반 컴포넌트가 있는 리덕스는

```jsx
import {Component} form 'react'
import {useSelector, useDispatch, connect} from 'react-redux'

class Counter extends Component {

const incrementHandler = () => {
  this.props.increment()
}

const decrementHandler = () => {
  this.props.decrement()
}

  render() {

    return (
      <div>{this.props.counter}</div>
      <button onClick={this.incrementHandler.bind(this)}>Increment</button>
      <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
    )
  }
}
const mapStateToProps = state => {
  return {
    counter: state.counter
  }
}

const mapDispatchToProps =dsipatch => {
  return {
    increment: () => dispatch({type: 'increment'})
    decrement: () => dispatch({type: 'decrement'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter) ✅
```

- 클래스 컴포넌트에서는 useSelector훅을 사용을 할수가 없습니다. -`connect`가 클래스 기반 컴포넌트를 리덕스에 연결하는데 도움을 줍니다.
  (함수 컴포넌트에서도 물론 사용을 할 수 있지만 훅이 더 편리하기 때문에 훅을 사용합니다.)
- `connect`은 고차함수로 리턴을 할 때 새함수를 반환합니다. 그리고 리턴함수에서 카운터를 보냅니다.
- 두개의 변수가 필요합니다.

### 실습 7 작업에 payload연결하기

payload란 액션에 추가적인 속성을 전달 할 수 있습니다.

만약, 1이 아니라 숫자 5씩 증가하는 버튼을 만드는 경우는 어떻게할까?

물론, store에서 5씩 증가하는 reducer를 하나 더 작성할 수도 있지만,이는 sortable하지 않습니다. 따라서 action에 접근할 때 추가적인 로직을 함께 전달해야합니다.

`reducer`

```js
import { createStore } from 'react-redux'

const couterReducer = (state = { count: 0 }, action) => {
...

  //추가
  if (action.type === 'increse') {
    return {
      counter: state.counter + action.amount,
    }
  }
...

  return state
}

const store = createStore(couterReducer)

export default store
```

`Counter.js`

```js
//추가
const increseHandler = () => {
  dispatch({ type: 'increase', amount: 5 })
}
```

### 실습 8. 여러 state다루기

토글버튼을 눌렀을 때 모든 버튼이 사라지고 다시 토글 버튼을 누르면 나타나게 만들어보도록 하겠습니다.

**버튼이 보이거나 사라지게 하는 토글동작의 경우 현재의 컴포넌트에만 관심을 있는 것이기 때문에 reudx가 아니라 useState로 관리**하는 것이 좋습니다.

단, 현재 counter역시 로컬 상태이기 때문에 액션에 디스페치를 해보도록 하겠습니다.

#### 8-1 리덕스 스토어에 새정보를 추가

`스토어-리듀서`

```js
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
```

`Counter.js`

```js
const Counter = () => {
  const dispatch = useDispatch()
  const counter = userSelector((state) => state.counter)
  const show = useSelector(state => state.showCounter)

return(
...
  const toggleCounterHandler = () => {
    dispatch({ type: 'toggle' })
  }
)}
```

### 실습 9 리덕스 state를 올바르게 사용하는 법

리덕스가 기존의 state를 대체하는 데 사용하는 완전히 새로운 객체인 새 snapshot을 항상 반환해야합니다.

즉, reducer에서 반환하는 객체는 중요하지 않지만, 중요한 것은 기존 state와 병합되지 않고 기존 state를 덮어쓴다는 것입니다.

**절대 기존 state를 변경해서는 안됩니다!** 대신에 새로운 state 객체를 반환하여 항상 재정의합니다.

---

# 리덕스 툴킷

## 1. 리덕스를 사용하면 생길 수 있는 문제.

```jsx
import {createStore} from 'redux'

const counterReducer = (state=initialState, action) {
  if(action.type === 'increment') {
    return {
      counter: state.counter + 1,
      showCounter: state.showCounter,
    }
  }
  ...
}
```

### 문제 1. action type에서 발생하는 문제

- action type에서 오타가 생기는 경우 reducer가 처리를 하지 못합니다.
- 프로젝트의 규모가 커지는 경우, action type의 식별자가 겹치는 경우 충돌을 발생시킬 수 있습니다.

**-> 해결: const를 사용하라.**

```jsx
import {createStore} from 'redux'

export const INCREMENT = 'increment'

const counterReducer = (state=initialState, action) {
  if(action.type === INCREMENT ) {
    return {
      counter: state.counter + 1,
      showCounter: state.showCounter,
    }
  }
  ...
}
```

`사용`

```jsx
import { INCREMENT } from '../store/index'

const incrementHandler = () => {
  dispatch({ tpye: INCREMENT })
}
```

### 문제 2. reducer의 상태관리

- 프로젝트의 규모가 커지고, 관리하는 state가 많아지는 경우 리덕스의 크기가 점차 커지고 관리하기가 어려워집니다.

### 문제 3. 상태변경의 불변성

- return 시 항상 새로운 상태의 스냅샷을 반환해야합니다.(state 원본 변경 불가)
- 중접된 객체 및 배열에서 의도치 않은 상태 변경이 생길 수 있습니다.

하지만 리덕스 툴킷을 사용하면, 이런 작업 없이 더 편리하고 쉽게 리덕스를 사용할 수 있습니다.

## 리덕스 툴킷 사용하기

### 1. 리덕스 툴킷 **세팅**

```
$ npm install @reduxjs/toolkit
$ yarn add @reduxjs/**toolkit**
```

리덕스 툴킷 안에는 redux가 포함되어 있기 때문에 기존에 설치를 했던 리덕스는 삭제를 해줘야합니다.

### 2. createSlice

`store>index.js`

```js
import { createSlice } from '@reduxjs/toolkit'

const initialState = { count: 0, showCounter: true }

createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.count++
    },
    decrement(state) {
      state.count--
    },
    increase(state, action) {
      state.count = state.count + action.amount
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter
    },
  },
})
```

- **리덕스 툴킷과 createSlice함수를 이용하면 기존의 상태값을 바꾸지 않을 수 있습니다.**-
- `@reduxjs/toolkit`에서 `createSlice`를 가져옵니다. `createReducer`을 가져올 수도 있지만, `createSlice`의 사용이 더 강력합니다.
- 각각의 action.type에 해당하는 리듀서를 구별해놓고 각각의 리듀서에 해당하는 함수를 호출해 사용을 합니다.

### 3. 리덕스툴킷, slice연결하기

```js
import { createSlice } from '@reduxjs/toolkit'

const initialState = { count: 0, showCounter: true }

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment() {},
    decrement() {},
    increase() {},
    toggleCounter() {},
  },
})

const store = createStore(counterSlice.reducer)

export default store
```

`const store = createStore(counterSlice.reducer)`와 같이 store에 `counterSlice`의 `reducers`를 등록해줍니다.

**configStore**

- configStore을 이용하면 여러개의 리듀서를 하나의 리듀서로 합쳐 사용을 할 수 있습니다.

`slice가 하나인 경우`

```jsx
const store = configureStore({
  reducer: counterSlice.reducer,
})
```

`slice가 여러개인 경우`

```jsx
const store = configureStore({
  reducer: { counter: counterSlice.reducer },
})
```

### 4. 리듀서툴킷을 이용한 마이그네이션

```jsx
export const counterActions = counterSlice.actions

export default store
```

store 뿐만 아니라 actions들도 내보냅니다.

`사용`

```jsx
import { counterActions } from '../store/index'

const incrementHandler = () => {
  dispatch(counterActions.increment())
}

const increaseHandler = () => {
  dispatch(counterActions.increase(10))
}
```

# Redux 실습

## 1. count 외 auth 전역 등록

```jsx
const counterSlice = createSlice({
  name: 'counter',
  initialState: initialCountState,
  reducers: {
    increment(state) {
      state.count++
    },
...
  },
})

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true
    },
...
  }
})
```

각각 다른 slice를 만든 후 아래와 같이 등록을 해줍니다.

```jsx
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    auth: authSlice.reuducer,
  },
})
```

## 2. 등록된 slice 사용
