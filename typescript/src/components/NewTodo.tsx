import React, {useRef} from 'react'

const NewTodo = () => {

  const todoTextInputRef = useRef<HTMLInputElement>(null)
  //만약 onClick의 경우 React.MouseEvent
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault()

    //아직 값이 설정되지 않았을 수도 있기 때문에 ?를 설정.
    //만약 이시점에 null이 아니라는 것을 확신한다면 !를 붙일 수 있습니다.
    const enteredText =todoTextInputRef.current!.value
    if(enteredText.trim().length===0) {
      //throw an error
      return; 
    }
  }
  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="text">Todo text</label>
      <input type="text" id="text" ref={todoTextInputRef}/>
      <button>Add Todo</button>
    </form>
  )
}

export default NewTodo