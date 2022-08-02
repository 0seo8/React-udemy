# Effects, Reducers & Context

## Effects

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

### stpe3 값과 유효성을 하나의 state로 결합해 useReducer로 관리

> ✅useReducer()의 첫번째 인자로 작성될 함수를 따로 빼서 작성할 수도 있습니다. \**단, 컴포넌트 함수외부에서 작성되어야합니다.*gi\*
>
> - 리듀서함수의 경우 다른 데이터와 상호작용을 할 필요가 없기 때문입니다. (컴포넌트 내부에서 만들어진 함수는 어떤 데이터도 필요로하지 않습니다.)

**수정전**

```jsx
const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('')
  const [emailIsValid, setEmailIsValid] = useState()
  const [enteredPassword, setEnteredPassword] = useState('')
  const [passwordIsValid, setPasswordIsValid] = useState()
  const [formIsValid, setFormIsValid] = useState(false)

  useEffect(() => {
    console.log('EFFECT RUNNING')

    return () => {
      console.log('EFFECT CLEANUP')
    }
  }, [])

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value)

    setFormIsValid(
      event.target.value.includes('@') && enteredPassword.trim().length > 6,
    )
  }

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value)

    setFormIsValid(
      enteredEmail.includes('@') && event.target.value.trim().length > 6,
    )
  }

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'))
  }

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6)
  }

  const submitHandler = (event) => {
    event.preventDefault()
    props.onLogin(enteredEmail, enteredPassword)
  }

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  )
}
```

**수정후**

```jsx
const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.value, isValid: action.value.includes('@') }
  }

  if (action.type === 'USER_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') }
  }
  return { value: '', isValid: false }
}

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.value, isValid: action.value.trim().length > 6 }
  }
  if (action.type === 'USER_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 }
  }
  return { value: '', isValid: false }
}

const Login = (props) => {
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  })
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  })

  const [formIsValid, setFormIsValid] = useState(false)

  useEffect(() => {
    console.log('EFFECT RUNNING')

    return () => {
      console.log('EFFECT CLEANUP')
    }
  }, [])

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', value: event.target.value })

    setFormIsValid(event.target.value.includes('@') && passwordState.isValid)
  }

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'USER_INPUT', value: event.target.value })

    setFormIsValid(emailState.isValid && event.target.value.trim().length > 6)
  }

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' })
  }

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR' })
  }

  const submitHandler = (event) => {
    event.preventDefault()
    props.onLogin(emailState.value, passwordState.value)
  }

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.value === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  )
}
```

### step4 useReducer & useEffect

현재 `const [formIsValid, setFormIsValid] = useState(false);`에서 따로 유효성검사를 하고 있기 때문에 최적화된 코드는 아닙니다. 이를 수정해도록 하겠습니다.

```jsx
useEffect(() => {
  const identifier = setTimeout(() => {
    console.log('Checking form validity!')
    setFormIsValid(emailState.isValid && passwordState.isValid)
  }, 500)

  return () => {
    console.log('CLEANUP')
    clearTimeout(identifier)
  }
}, [emailState, passwordState])

const emailChangeHandler = (event) => {
  dispatchEmail({ type: 'USER_INPUT', val: event.target.value })

  // setFormIsValid(event.target.valu.includes('@') && passwordState.isValid)
}

const passwordChangeHandler = (event) => {
  dispatchPassword({ type: 'USER_INPUT', val: event.target.value })

  // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6)
}
```

그런데 문제점이 있습니다. useEffect가 emailState, passwordState 값이 변할떄마다 실행되며 너무 잦은 실행이 되고 있다는 점입니다.

**해결방법**

```jsx
const { isValid: emailIsValid } = emailState
const { isValid: passwordValid } = passwordState

useEffect(() => {
  const identifier = setTimeout(() => {
    console.log('Checking form validity!')
    setFormIsValid(emailIsValid && passwordValid)
  }, 500)

  return () => {
    console.log('CLEANUP')
    clearTimeout(identifier)
  }
}, [emailIsValid, passwordValid])
```

객체구조분해를 통해 사용할 isValid만 꺼내와 사용을 할 수 있습니다. 이제는 값만 변경되고 유효성검사는 변경되지 않는다면 useEffect은 실행되지 않습니다.

> 핵심정리

- destructuring을 사용한다는 것이 아니라, 전체 개체 대신 특정 속성을 종속성으로 전달한다는 것

### step5 useState vs useReducer

useState: 간단한 state / state의 업데이트가 쉽고 state가 몇종류 안되는 경우
useReducer: 복잡한 로직을 통해 state를 업데이트해야하는경우, 연관된 state 조각을 다루는 경우

## Context API

> 리액트에는 내장된 내부 state 저장소가 있습니다.이를 react context라고 합니다.

- Props가 많은 컴포넌트를 통해 많은 데이터를 전달하는 경우 예기치 못한 문제를 방지할 수 있습니다.

### step1

1. context 파일 만들기
   components > store > auth-context.js

- AuthContext로 파일명을 만들 수도 있지만 이경우 컴포넌트를 저장한다는 의미가 크기에 케밥케이스로 작성해줍니다.

`auath-context.js`

```js
import React from 'react'

const AuthContext = React.createContext({
  isLoggedIn: false,
})
```

- AuthContext자체가 컴포넌트는 아니지만 컴포넌트를 포함할 객체이기 때문에 카멜케이스로 작성해줍니다.

1. 컨텍스트를 사용하려면 두가지 작업이 필요합니다.

**첫번째: 컴포넌트를 공급**

- 접근 권한부여
- 공급한다는 것은 JSX코드로 감싼다는 이야기입니다.
  (컨텍스트를 사용하는 컴포넌트의 태그를 JSX로 랩핑)
- `<AuthContext.Provider>`로 감싼 하위 컴포넌트 모두 context API사용이 가능합니다.

ex) MainHeader, Login컴포넌트에서 context API가 필요한 경우

```jsx
import AuthContext from './components/store/auth-context'

return (
  <AuthContext.Provider
    value={{
      isLoggedIn: isLoggedIn,
    }}
  >
    <MainHeader /*isAuthenticated={isLoggedIn}더이상필요하지 않음*/
      onLogout={logoutHandler}
    />
    <main>
      {!isLoggedIn && <Login onLogin={loginHandler} />}
      {isLoggedIn && <Home onLogout={logoutHandler} />}
    </main>
  </AuthContext.Provider>
)
```

- `AuthContext` 그 자체로는 컴포넌트가 아니기에 react의 Provider속성을 이용합니다.
- `value={}`라는 프롭을 가져야합니다.

**두번째 hook을 연결하고 관찰해야합니다.**

- listening의 경우 custom 또는 react hook을 이용해 할 수 있습니다.

  1. react hook 이용

```jsx
<AuthContext.Consumer>
  {(ctx) => {
    return (
      <nav className={classes.nav}>
        <ul>
          {props.isLoggedIn && (
            <li>
              <a href="/">Users</a>
            </li>
          )}
          {props.isLoggedIn && (
            <li>
              <a href="/">Admin</a>
            </li>
          )}
          {props.isLoggedIn && (
            <li>
              <button onClick={props.onLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    )
  }}
</AuthContext.Consumer>
```

- <AuthContext.Consumer>태그로 한번 감싸준 후 그 안에서 `{(cxt) => { retrun }}` 함수를 호출합니다.
- return 되는 값에 감싼 태그를 넣어줍니다.
- isLoggedIn의props를 cxt로 변경해줍니다.

### step2 useContext훅으로 tapping하기

- 리액트에 내장된 useContext 훅을 사용하면 다른 컨텍스트를 사용할 수 있습니다.

```jsx
import React, { useContext } from 'react'

const Navigation = (props) => {
  const ctx = useContext(AuthContext)

  return (
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
    ...
  )
```

- `<AuthContext.Consumer>태그로 한번 감싸준 후 그 안에서`{(cxt) => { retrun }}` 함수를 호출`했던 과정을 줄여줍니다.

### step3 context API를 동적을 만들기

```jsx
  <AuthContext.Provider
    value={{
      isLoggedIn: isLoggedIn,
      onLogout: logoutHandler
    }}
  >
```

- isLoggedIn외에도 onLogout핸들러함수를 보내줄 수도 있습니다.
- 문자열이나 객체 등의 값을 전달할 수는 없지만 함수를 전달할 수는 있습니다.

### stpe4 사용자 정의 컨텍스트 제공자 구성요소 및 빌드 사용

```jsx
import React from 'react'

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
})

export const AuthContextProvider = (props) => {
  return <AuthContext.Provider>{props.children}</AuthContext.Provider>
}

export default AuthContext
```

위와 같이 함수를 정의하는 경우 useState를 가져와 사용할 수 있습니다.

```jsx
import React, { useState } from 'react'

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
})

export const AuthContextProvider = (props) => {
  const { isLoggedIn, setIsLoggedIn } = useState(false)

  const logoutHandler = () => {
    setIsLoggedIn(false)
  }

  const loginHandler = () => {
    setIsLoggedIn(true)
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogIn: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
```

- 중앙집중적인 접근방식으로 프로젝트를 변경할 수 있습니다.

### step5

context api는 모든 것에서 사용할 수 있을까?

- 그렇지 않습니다.
- 앱전체 컴포넌트 전체의 state와 같이 여러곳에 영향을 미치는 state에는 적합합니다.
- 하지만 컴포넌트 구성을 대체할 수는 없기에 구성은 props를 사용하는 것이 좋습니다.(ex) Button)
- 또한 변경이 은 경우 react context는 적합하지 않습니다.

> > ## Hooks 규칙

1. 리액트 cumstom hook 또는 react 컴포넌트 함수에서만 호출해야합니다.
2. 최상위 수준에서만 호출해야합니다.

- hook안에서 hook을 호출할 수 없습니다.
- 중첩함수에서 호출할 수 없습니다.

3. useEffect의 경우 참조하는 모든 항목을 uesEffect내부에 포함해야합니다.

### step6 Input컴포넌트

### step7 Forward Refs

- useRef를 이용한 유효하지 않은 input에 포커스하기

```jsx
  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  <label htmlFor="password">Password</label>
  <Input
    label="password"
    type="password"
    id="password"
    isValid={passwordValid}
    value={passwordState.value}
    onChange={passwordChangeHandler}
    onBlur={validatePasswordHandler}
  />
```

위 케이스의 경우 inputRef.current.focus()는 id와 password 중 마지막으로 포커스가 유지되는 password에 포커스를 합니다. 우리가 구현하고자 하는 목표는 아닙니다.
