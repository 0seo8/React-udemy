# HTTP

## 1. 리액트와 데이터베이스 통신

[swapi](!https://swapi.dev/)

리액트엡에서 데이터베이스를 서버에서 실행하는 것은 괜찮지만, 앱으로 직접가져와 저장하고 연결하는 것은 절대하면 안됩니다.

- 이것은 데이터베이스의 인증정보를 노출하게 됩니다.
- 또한 성능문제도 발생할 수 있습니다.

![](https://velog.velcdn.com/images/0seo8/post/7b9178db-8666-4ef5-8039-377fa4c56ad6/image.png)

1-1. API란?
어플리케이션 프로그래밍 인터페이스

1-2 프로미스 처리
`then을 이용한 프로미스 처리`

```jsx
function fetchMoviesHandler() {
  fetch('https://swapi.dev/api/films/')
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      const transformMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releasData: movieData.release_date,
        }
      })
      setMovies(transformMovies)
    })
}
```

`async await이용`

```jsx
async function fetchMoviesHandler() {
  const response = await fetch('https://swapi.dev/api/films/')
  const data = response.json()
  const transformMovies = data.results.map((movieData) => {
    return {
      id: movieData.episode_id,
      title: movieData.title,
      openingText: movieData.opening_crawl,
      releasData: movieData.release_date,
    }
  })
  setMovies(transformMovies)
}
```
