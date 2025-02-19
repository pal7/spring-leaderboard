import { createPortal } from "react-dom";
import "./Modal.css";

export default function Modal({ children, onClose, className = "", ref }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      if (ref.current) {
        ref.current.close();
      }
      if (onClose) {
        onClose();
      }
    }
  };

  return createPortal(
    <dialog
      ref={ref}
      className={`modal ${className}`}
      onClick={handleOverlayClick}
    >
      <div className='modal__content'>
        <button
          className='modal__close-button'
          onClick={() => {
            if (ref.current) {
              ref.current.close();
            }
            // Optionally call onClose if provided
            if (onClose) {
              onClose();
              console.log();
            }
          }}
          aria-label='Close modal'
        >
          &times;
        </button>
        {children}
      </div>
    </dialog>,
    document.getElementById("modal-root")
  );
}
