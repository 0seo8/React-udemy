import React from 'react'
import ReactDOM from 'react-dom'

import Card from './Card'
import Button from './Button'

import style from './ErrorModal.module.css'

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

export default ErrorModal
