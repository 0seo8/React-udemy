# UDEMY

udemy강의를 들으면서 잊지 않도록 기록해놓는 레포지토리 입니다.
각 커밋 기록에 맞춰 복습이 필요하거나 중점으로 두고 공부를 해야하는 부분에 대한 내용이 현재 파일에 기록되어 있습니다.

## first-app

### step1

- `form` 태그로 감싼 후 form태그에 onSubmit이벤트 설정해주기
  - onSubmit이벤트의 경우 내부 `button[type="sumbit"]`의 submit발생 시 동작을 합니다.
  - 다른 이벤트 버블링을 막기 위해 이벤트 핸들러에 `event.preventdefalt()` 설정을 꼭 해줘야합니다.(기본 동작 방지)

### stpe2

목표: Card라는 컴포넌트를 만들어 적용시켜보기.

1. Card컴포넌트 만들기
   1-1 확장

```jsx
function Card(props) {
  return <div>{props.children}</div>
}
```

위와 같이 props.children을 통해 <Card></Card> 사이에 위치하는 컴포넌트를 확장시켜줍니다.

1-2. Card.module.css파일 적용

```css
.card {
  ...;
}
```

```jsx
import style from './Card.module.css'

function Card(props) {
  return <div className={style.card}>{props.children}</div>
}
```

2. Card컴포넌트 적용시키기
   `import Card from '../UI/Card'` `<Card></Card>`태그로 한번 감쌉니다.

3. ⭐ 내부 컴포넌트에 외부 컴포넌트 확장시키기

- Card컴포넌트는 사용자 정의 컴포넌트로 html에 내장된 컴포넌트가 아닙니다. 따라서 그 컴포넌트 안에서 사용하는 props를 통해서만 적용할 수 있습니다.
- 이미 Card컴포넌트에 적용된 스타일 뿐만 아니라 props로 받아온 스타일도 적용시키는 방법은 아래와 같습니다.

```jsx
//Card.js
<div className={`${style.card} ${props.className}`}>{props.children}</div>
```

- 여기서 props.className의 경우 원하는 이름으로 설정을 하면됩니다.
  - 단, className말고 다른 이름을 사용하는 경우 AddCard.js에서도 사용하고자하는이름={}으로 스타일을 적용시켜야합니다.

![](https://velog.velcdn.com/images/0seo8/post/cb170208-75b3-425e-93d6-0fe10dc975bc/image.png)

### step3

목표: 버튼 컴포넌트 만들기(props로 type과 onClick핸들러를 받아 적용)

1. props로 type적용

```jsx
function Button(props) {
  return (
    <button
      className={style.button}
      type={props.type || 'button'}
      onCick={props.onClick}
    >
      {props.children}
    </button>
  )
}
```

`type={}`을 통해 Button이 적용될 컴포넌트에서 타입을 받아오되, `|| 'button'`을 통해 기본 default값을 설정해줍니다.

2. 사용

```jsx
import Button from '../UI/Button'

return <Button type="submit">Add User</Button>
```

![](https://velog.velcdn.com/images/0seo8/post/19eb5c5d-7f0f-452f-bb03-7c8f8ff78df3/image.png)

### step4

- useState를 이용한 onChange이벤트 설정

### step5

목표: 검증 추가 로직 생성하기

1. input 초기화

```jsx
const addUserHandler = (e) => {
  e.preventDefault()
  setEnteredUsername('')
  setEnteredAge('')
}
```

위와 같이 작성을 한 후 확인을 해보면 예상과 달리 input값이 초기화되지 않습니다.
⭐사실 input값이 초기화되었지만 현재 상태가 반영되고 있지 않은 것입니다.

> 초기화 된 값을 다시 input에 전달하기 (value사용)

- value값을 사용하면 키 입력으로 변경되는 경우 뿐만 아니라 폼을 제출하는 경우에도 반응성을 가지게됩니다.

2. 유효성검사
   목표: input값이 공백이거나 age가 0보다 작은 경우는 제출이 안되게 설정

```jsx
const addUserHandler = (e) => {
  e.preventDefault()
  if (enteredUsername.trim().length === 0 || enteredAge.trim.length === 0)
    return
  if (+enteredAge < 1) return
  setEnteredUsername('')
  setEnteredAge('')
}
```

주의점: enteredAge의 경우 useState('')을 통해 문자열로 초기화했기 때문에 문자열을 갖습니다. 따라서 if조건문 사용지 +를 붙여 숫자형으로 변환한 후 비교를 해줘야합니다.

### setp6

목표: 사용자목록

- userList의 값을 가져오는 로직과 출력하는 로직으로 구분된 두가지 컴포넌트가 필요합니다.
- UserList : 출력담당

1. UserList에 props로 users리스트에 대한 정보를 받아 출력하는 로직 작성

```jsx
function UserList(props) {
  return (
    <ul>
      {props.users.map((user) => (
        <li>
          {user.name} ({user.age} years old)
        </li>
      ))}
    </ul>
  )
}
```

1-1 Card컴포넌트 사용 복습

```jsx
function UserList(props) {
  return (
    <Card className={style.users}>
      <ul>
        {props.users.map((user) => (
          <li>
            {user.name} ({user.age} years old)
          </li>
        ))}
      </ul>
    </Card>
  )
}
```

- 위와 같이 userList에 정의된 스타일을 style.users로 내려보내줘야합니다.

2. UserList를 어디서 출력할 것인지를 결정.

```jsx
function App() {
  return (
    <div>
      <AddUser />
      <UserList />
    </div>
  )
}
```

- App.js에 USerList출력을 해보면 에러가 확인되는 것을 알 수 있습니다.(map이 undefined)
  - props.users 속성을 설정하고 있지 않기 떄문입니다.
  - ⭐`<UserList user={[]} />` 과 같이 user에 빈배열을 할당해 undefined가 되지 않도록 설정해줘야합니다.
