## Effects, Reducers & Context

### step1. What is an "Effect"(Side Effect)

- 함수를 입력값에 대해 일정한 출력을 하는 것으로 가정할 때, 출력값에 영향을 미치지 않는 모든 작업들을 side effect라고 합니다.
- ex) http 요청을 보내거나 브라우저 저장소에 무언가를 저장하는 일
- 화면에 무언가를 가져오는 것과는 직접적인 관계가 없는 일들을 의미합니다.
- 이런 사이드 이펙트는 일반적인 컴포넌트 함수 밖에서 평가되어야 합니다.

### step4 클린업 함수

- 만약 사용자가 input창에 아이디를 입력한 후 마지막 입력으로부터 일정 시간동안 입력이 없는 경우 유효성검사를 하고 싶은 로직을 짤 때, useEffect가 매우 유용합니다.

```jsx
useEffect(() => {
  const identifier = setTimeout(() => {
    setFormIsValid(
      enteredEmail.includes('@') && enteredPassword.trim().length > 6,
    )
  }, 500)

  return () => {
    clearTimeout(identifier)
  }
}, [enteredEmail, enteredPassword])
```

만약, 사용자가 다시 타이핑을 시작하는 경우 이전 timer는 지워줍니다.

## useReducer

> useReducer의 경우 관리하는 state가 많아질 때 useState대신 사용을 할 수 있습니다.

### step1 useReducer를 언제 사용하나요

```jsx
const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('')
  const [emailIsValid, setEmailIsValid] = useState()
...
  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'))
  }
...
}
```

`validateEmailHandler`함수의 사용은 잘 못되고 있습니다.

- 각각의 enteredEamil, emailIsValid는 다른 state로 만약 위와 같이 사용을 한다면 enterEmail에 대한 어떤 state의 업데이트가 늦게 되며 예상과 다른 결과가 나올 수도 있기 때문입니다.
- 이런 경우 useReducer를 사용할 수 있습니다.
  즉, 다른 state를 기반으로 하는 로직을 작성하는 경우에는 useReducer를 사용하는 것을 권장합니다.
  (물론, useReducer 없이 하나의 state로 병합할 수 있습니다.)

### 2. step2 useReducer의 단계

```jsx
const [state, dispatchFn] = useReducer(reducerFn, initalState, initFn)
```

- `state`: 최신 스냅샷
- `dispatchFn` : 함수를 통해 스냅샷을 업데이트
- `reducerFn` : `dispatchFn`에서 사용되는 reducer함수
  - 새로운 업데이트를 반환합니다.
  - reducerFn을 따로 빼서 작성하는 경우 컴포넌트 함수 외부에서 작성을 해야합니다.
  - reducerFn(state, action) state,action두가지 인수를 받을 수 있습니다.
- `initialState` : 초기 state나 함수를 설정할 수 있습니다.
- `initFn`: 초기 state를 설정하기 위해 실행되어야하는 함수

* PLUS

-

### stpe3 값과 유효성을 하나의 state로 결합해 useReducer로 관리

> ✅useReducer()의 첫번째 인자로 작성될 함수를 따로 빼서 작성할 수도 있습니다. **단, 컴포넌트 함수외부에서 작성되어야합니다.**
>
> - 리듀서함수의 경우 다른 데이터와 상호작용을 할 필요가 없기 때문입니다. (컴포넌트 내부에서 만들어진 함수는 어떤 데이터도 필요로하지 않습니다.)

`작성예시`

```jsx
import React, { useState, useReducer } from 'react'

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') }
  }

  if (action.type === 'USER_BLUR') {
    return { value: state.value, isValid: state.val.includes('@') }
  }

  return { value: '', isValid: false }
}

const Login = (props) => {
  const [eamilState, dispatchEmail] = useReducer(emailReducer)

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value })

    setFormIsValid(
      event.target.value.includes('@') && enteredPassword.trim().length > 6,
    )
  }

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' })
  }

  return <></>
}
```
