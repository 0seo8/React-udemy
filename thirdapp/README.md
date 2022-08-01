## Effects, Reducers & Context

### step1. What is an "Effect"(Side Effect)

- 함수를 입력값에 대해 일정한 출력을 하는 것으로 가정할 때, 출력값에 영향을 미치지 않는 모든 작업들을 side effect라고 합니다.
- ex) http 요청을 보내거나 브라우저 저장소에 무언가를 저장하는 일
- 화면에 무언가를 가져오는 것과는 직접적인 관계가 없는 일들을 의미합니다.
- 이런 사이드 이펙트는 일반적인 컴포넌트 함수 밖에서 평가되어야 합니다.

### step2
