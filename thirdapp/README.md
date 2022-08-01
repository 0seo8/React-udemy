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

**step1**

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
