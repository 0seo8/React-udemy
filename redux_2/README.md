# 리덕스 심화

## 목표

- 장바구니 클릭 시 your shopping cart라는 카드가 보였다가 사라졌다가 가능하게 만들기.
- Add to Cart 클릭시 장바구니에 제품이 추가되고, 이미 장바구니에 상품이 들어있다면 수량을 조절할 수 있게금 만들어보기.
- +, - 버튼을 이용해 수량 조절
  - 만약, 상품이 1개인 경우 - 버튼을 클릭하는 경우 장바구니에서 제품 제거

### 1. 설치

```
$ yarn add @reduxjs/toolkit
$ yarn add react-redux
```

### 2. src > store 폴더 생성

`index.js`, `ui-slice.js`, `cart-slice.js` 생성

### 3. store적용

`루트 경로 indxe.js`

```jsx
import { Provider } from 'react-redux'
import store from './store/index'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
)
```

### 4. ui-slice.js 작성

- 장바구니 버튼 클릭시 your shopping cart 카드 보였다 안보였다 하기.

`ui-slice.js`

```jsx
import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: { cartISVisible: false },
  reducers: {
    toggle(state) {
      state.cartISVisible = !state.cartISVisible
    },
  },
})

export const uiActions = uiSlice.actions
export default uiSlice
```

`store>index.js`

```jsx
import { configureStore } from '@reduxjs/toolkit'

import uiSlice from './ui-slice'

const store = configureStore({
  reducer: { ui: uiSlice.reducer },
})

export default store
```

### 5. ui-slice.js 사용

`CartButton.js`

```jsx
import { useDispatch } from 'react-redux'
import { uiActions } from '../../store/ui-slice'

const CartButton = (props) => {
  const dispatch = useDispatch()
  const toggleCartHandler = () => {
    dispatch(uiActions.toggle())
  }

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>1</span>
    </button>
  )
}
```

`App.js`

```jsx
import { useSelector } from 'react-redux'

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible)
return (
  <Layout>
    {showCart && <Cart />}
    <Products />
  </Layout>
)
```

### 6.
