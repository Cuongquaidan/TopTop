import React from "react";
import ReactDOM from "react-dom";
import { IoClose } from "react-icons/io5";

const modalRoot = document.getElementById("modal-root");

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[999] bg-black/40 flex justify-center items-center">
      <div className="bg-white dark:bg-neutral-900 py-6 rounded shadow-md w-[450px] h-[650px] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-700 dark:text-gray-300 w-10 h-10 flex items-center z-50 justify-center font-semibold text-3xl cursor-pointer"
        >
          <IoClose />
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
}

export default Modal;
