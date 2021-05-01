import React from 'react'
import './Modal.css'

type ModalProps = {
  /** children React Node */
  children: React.ReactNode
  /** show or hide modal */
  show: boolean
  /** callback for closing */
  handleClose: () => void
}

const Modal: React.FC<ModalProps> = ({ children, show, handleClose }) => {
  const showHideClassName = show ? ['modal', 'displayBlock'].join(' ') : ['modal', 'displayNone'].join(' ')

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  )
}

export default Modal
