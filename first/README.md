## 1. first-app

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

### step 7 : state 끌어올리기 ✅반복복습필요

목표: Adduser에서 버튼 클릭시 새로운 user객체를 생성해 그 배열에 값을 추가한 후 userList에서 출력되게 만들기

1. state끌어올리기

- Adduser컴포넌트와 UserList 컴포넌트 모두 접근이 가능해야합니다.
- 따라서 UserList에서 user관련 state를 다루기 보다는 두컴포넌트에서 모두 접근 가능하도록 그 상위인 App.js에서 다루는 것이 효율적입니다.

```jsx
function App() {
  const [userList, setUserList] = userState([])

  return (
    <div>
      <AddUser onAddUser={} />
      <UserList users={userList} />
    </div>
  )
}
```

2. AddUser로 전달할 이벤트 핸들러 만들기

```jsx
function App() {
  const addUserHandler = (uName, uAge) => {
    setUserList((prevUeerList) => {
      return [...prevUeerList, { name: uName, age: uAge }]
    })
  }

  return (
    <div>
      <AddUser onAddUser={addUserHandler} />
    </div>
  )
}
```

```jsx
function AddUser(props) {
  const addUserHandler = (e) => {
    e.preventDefault()
    ...
    props.onAdUser(enteredUsername, enteredAge) ✅
    ...
  }
...
}
```

이제 AddUser 컴포넌트에서 submit이벤트가 발생하는 경우 `addUserHandler`핸들러에 의해 App.js에 정의된 `addUserHandler` 가 실행되게 됩니다. (즉, 현재 사용자정보가 추가되게 됩니다.)

![](https://velog.velcdn.com/images/0seo8/post/3816a0fe-b986-470d-9a60-3d798078ca20/image.png)

3. 유니크한 아이디 전달하기
   ![](https://velog.velcdn.com/images/0seo8/post/c0ea6d0e-1dfa-4cc4-8efa-1e6424c685d1/image.png)

### step8 : Error Modal컴포넌트 만들기

1. 에러모달컴포넌트를 어느 컴포넌트에서 출력을 할 것인지가 논쟁거리가 될 수 있습니다.

- 우리는 AddUser컴포넌트에서 사용합니다.

2. AddUser에서 적용

```jsx
return (
  <>
    <ErrorModal title="An error occured!" message="Someting went wrong!" />
    <Card className={style.input}>...</Card>
  </>
)
```

3. 문제 발생
   ![](https://velog.velcdn.com/images/0seo8/post/83b9d1f6-fe60-43ae-9d79-1a8a17e7c147/image.png)

모달창이 정상적으로 출력되었습니다. 그런데 지금은 모달창 아래의 input창에 작성이 가능합니다. 즉, 나머지 페이지와 상호작용이 되는 상태입니다.

문제해결 : 다른 컴포넌트와의 상호작용막기

```jsx
function ErrorModal(props) {
  return (
    <div> ✅
      <div /> ✅
      <Card className={style.modal}>
        <header className={style.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={style.content}>
          <p>{props.message}</p>
        </div>
        <footer className={style.actions}>
          <Button>Okay</Button>
        </footer>
      </Card>
    </div> ✅
  )
}
```

- Card컴포넌트와 형제요소로 닫힌 div태그를 만들어줍니다.
  ![](https://velog.velcdn.com/images/0seo8/post/be3a11fe-8379-4f89-94fd-b9137923f6f4/image.png)

### step9

목표: 유효하지 않은 경우에만 모달컴포넌트 띄우기

1.

```jsx
function AddUser(props) {
...
  const [error, setError] = useState()

  const addUserHandler = (e) => {
    e.preventDefault()
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).',
      })
      return
    }
    if (+enteredAge < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (>0).',
      })
      return
    }
...
  }


  return (
    <>
      {error && <ErrorModal title={error.title} message={error.message} />}
      <Card className={style.input}>
        ...
      </Card>
    </>
  )
}
```

- error title과 message가 들어있는 객체를 다룰 useState생성
- 유효성 검사에 추가
- return {}에서 표현식으로 error가 있는 경우만 출력

2. error state를 초기화해주는 함수 만들기

```jsx
//AddUser.js
const errorHandler = () => {
  setError(null)
}

return (
<>
  {error && (
    <ErrorModal
      title={error.title}
      message={error.message}
      onConfirm={errorHandler}
    />
  }
    ...
  )
```

AddUSer 컴포넌트 내에서 만든 에러핸들러는 ErrorModal컴포넌트에서 다룰 수 있습니다.
(backdrop과 okay버튼을 ErrorModal컴포넌트에서 가지고 있기 때문입니다.)

```jsx
function ErrorModal(props) {
  return (
    <div>
      <div className={style.backdrop} onClick={props.onConfirm} />✅
      <Card className={style.modal}>
        ...
        <footer className={style.actions}>
          <Button onClick={props.onConfirm}>Okay</Button>✅
        </footer>
      </Card>
    </div>
  )
}
```

---

## 2. Second-app 깔끔한 코드 작성하기

### step1

> 핵심 주제
> jsx에서의 최상위 태그가 1개가 되어야하는 점을 해결하기 위한 wrapper컴포넌트

```jsx
const Wrapper = (props) => {
  return props.children
}

export default Wrapper
```

- 기본적으로 빈 컴포넌트로 여는태그와 닫는 태그 사이에 있는 내용을 반환합니다.

### step3

> React.Fragment

- 직접 Wrapper객체를 만들지 않아도 React에서 제공하는 플래그먼트 컴포넌트 입니다.

**사용방법**

```jsx
return (
  <React.Fragment>
    <h2>Hi there!</h2>
    <p>This does no work!</p>
  </React.Fragment>
)
```

or

```jsx
return (
  <>
    <h2>Hi there!</h2>
    <p>This does no work!</p>
  </>
)
```

**step3**

> React Potals

현재 프로젝트의 모달 컴포넌트의 경우 기술적으로 작동을 하더라도 스타일링이나 접근성 관점에서 좋은 코드 및 좋은 구조는 아닙니다.

이럴 때 리액트 포털을 이용할 수 있습니다.

`포털 사용전`
![](https://velog.velcdn.com/images/0seo8/post/71607e82-66c1-4e90-b390-841b8828c831/image.png)

`포털 사용`
![](https://velog.velcdn.com/images/0seo8/post/c15a64c5-974c-48d3-a1e5-4591aff318b8/image.png)

**step4**

> potals사용방법

- 컴포넌트를 이동시킬 장소와 그곳에 포털을 가져야한다고 알려줄 코드가 필요합니다.

1. public 폴더 내의 index.html에서 potals가 출력될 위치를 잡아줍니다.

```html
<body>
  <div id="backdrop-root"></div>
  <div id="overlay-root"></div>
  <div id="root"></div>
</body>
```

위와 같이 루트를 여러개 만들어 각각 다른 종류의 컴포넌트들이 포털되게 할 수 있습니다.

또한 backdrop-root 아래에 modal-root를 쓰면 모든 조ㄹㅇ류으 오버레이나 모달, 사이드 드로어를 가져올 수 있습니다.

2. ErrorModal에 적용

2-1. 먼저 ErrorModal이라는 컴포넌트를 두개로 나눠줍니다.

`변경전`

```jsx
function ErrorModal(props) {
  return (
    <div>
      <div className={style.backdrop} onClick={props.onConfirm} />
      <Card className={style.modal}>
        <header className={style.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={style.content}>
          <p>{props.message}</p>
        </div>
        <footer className={style.actions}>
          <Button onClick={props.onConfirm}>Okay</Button>
        </footer>
      </Card>
    </div>
  )
}
```

`변경 후`

```jsx
const Backdrop = (props) => {
  return <div className={style.backdrop} onClick={props.onConfirm} />
}

const ModalOverlay = (props) => {
  return (
    <Card className={style.modal}>
      <header className={style.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={style.content}>
        <p>{props.message}</p>
      </div>
      <footer className={style.actions}>
        <Button onClick={props.onConfirm}>Okay</Button>
      </footer>
    </Card>
  )
}

function ErrorModal(props) {
  return <React.Fragment>{}</React.Fragment>
}
```

2-2. Fragment내부에 표현식을 이용해 만든 컴포넌트를 적용

```jsx
import ReactDOM from 'react-dom'

function ErrorModal(props) {
  return <React.Fragment>{ReactDOM.createPortal()}</React.Fragment>
}
```

**createPortal(렌더링되어야하는 노드를 JSX형식으로, 실제로 렌더링되어야 하는 컴포넌트 )**

```jsx
function ErrorModal(props) {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onConfirm} />,
        document.getElementById('backdrop-root'),
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          titl={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
        />,
        document.getElementById('overlay-root'),
      )}
    </React.Fragment>
  )
}
```

![](https://velog.velcdn.com/images/0seo8/post/f651eb09-1a7e-4587-80f9-812b3bf39c34/image.png)

렌더링되어야하는 위치들에 잘 들어가있는 것을 확인할 수 있습니다.

### step4: useRef

ref는 다른 DOM 요소에 접근해서 그것들로 작업할 수 있게 해줍니다.

현재 프로젝트에서의 input값은 state를 통해 관리되고 있습니다. 그런데 사실은 폼을 제출할때만 필요할 뿐인데 키를 입력할 때마다 state를 업데이트 한다는 점이 아쉽습니다.

이런 경우 ref를 사용할 수 있습니다.

1. ref를 사용하기 위해서는 useRef 훅이 필요합니다.

```jsx
const React, {useRef} from 'react'

function AddUser(props) {
  const nameInputRef = useRef()
  const ageInputRef = useRef()

  return(
    <input ref={nameInputRef} />
    <input ref={ageInputRef} type="number"/>
  )
}
```

이렇게 생성한 ref의 current속성을 확인해보면 실제 DOM노드가 들어있는 것을 확인할 수 있습니다.

따라서 input의 값을 읽을 때 e.target.value가 아니라 생성ref.current.value로 접근할 수가 있습니다.

ref를 이용하면 state 및 그로인한 이벤트 핸들러를 관리하지 않아도 되기 때문에 코드가 훨씬 간결해집니다.

**실제로 DOM을 조작하기 위해 ref를 사용하는 것은 매우 드뭅니다.**

### step5 비제어컴포넌트

```jsx
<input id="username" ref={nameInputRef} />
```

현재 input컴포넌트의 경우 제어되지 않는 컴포넌트 입니다. 왜냐하면 사용하고 있는 값들이 모두 내부 state로 리액트에 의해 제어되지 않기 때문입니다.

ref라는 리액트의 기능을 이용해 데이터의 값만 읽어올 뿐 input에 새갑을 설정하거나 하지 않습니다.
