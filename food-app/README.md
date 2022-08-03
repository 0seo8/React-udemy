# Food App

## 장바구니 관리

1. context 생성

`src > store > cart-context.js`

```jsx
import React from 'react'

const CartContex = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
})

export default CartContex
```

2. context 관리
   > - useState/ useReducer 안에서 관리를 해야 시간이 흐르거나 상태값이 변경되어도 관리가 될 수 있습니다.<br>- useState, useReducer안에서 관리를 하기 위해서는 Provider를 사용해야합니다.
