# 라우터 문제

## 1.

모든 이용문을 보여주는 페이지에서 단일인용문페이지를 클릭하면 디테일페이지로 이동, 또한 새 인용문 추가페이지까지 라우터 3개를 생성해 풀기

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AllQuotes from './pages/AllQuotes'
import NewQuote from './pages/NewQuote'
import QuteDetail from './pages/QuteDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'quotes'} element={<AllQuotes />} />
        <Route path={'quotes/:quotedId'} element={<NewQuote />} />
        <Route path={'new-quote'} element={<QuteDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
```

## 2. /nothing으로 접속하면 /quote로 redirect시켜라.

- 리다이렉트 일단 보류

## 3. QuoteDetail페이지에서 :quoteId 알아내기

react-router-dom에서 제공하는 `useParams`를 이용하면 동적으로 전달된 매개변수의 값을 알 수 있습니다.

```jsx
import {useParams} from 'react-router-dom'

function QuoteDetail() {
  const params = useParams()
  ...
}
```

## 4. 중첩라우터

`path='/quotes/:quoteId/comment'`를 중첩 라우트를 사용하여 렌더링하시오.

## 5. Navigation 설정

react-route-dom의 Link , NavLink

```jsx
<NavLink to="/quotes" activcClassName={styles.active} />
```

## 5. useHistory in react-router-dom

- 페이지의 history를 바꿀 수 있습니다.

## 6. useLocation in react-router-dom

- useHistory는 history객체에 접속하게 하고, history객체는 URL을 바꿀 수 있도록 해줍니다.
- useLocation은 location 객체에 접속 가능하게 하고, location 객체에는 최근 로드된 페이지와 URL정보가 들어있습니다.
-

## 기타정리

- React router의 경우 history가 변경되면 페이지가 재렌더링 됩니다.
- `new URLSeartchParams`: 브라우저 내장함수
  - `const queryParams = new URLSEarchParams(location.search)` 쿼리매개변수를 추출합니다.

## 헿.....라우터 포기, 나중에 이어서.
