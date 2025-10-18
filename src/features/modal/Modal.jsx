function Modal({ children, modalType }) {
    return <div className={`modal ${modalType}`}>{children}</div>;
}

export default Modal;
