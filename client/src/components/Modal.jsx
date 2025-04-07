import React, { useEffect } from "react";

const modalRoot = document.getElementById("modal-root");
function Modal({ children, onClose }) {
    const el = document.createElement("div");
    useEffect(() => {
        modalRoot.appendChild(el);
        return () => {
            modalRoot.removeChild(el);
        };
    }, [el]);
    return (
        <div
            className="fixed inset-0 z-[999] items-center justify-center bg-black/50 flex"
            onClick={onClose}
        >
            <div className="" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default Modal;
