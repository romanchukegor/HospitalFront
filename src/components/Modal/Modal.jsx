import "./style.scss";

const Modal = ({
  setIsActiveModal,
  children,
  title,
  modifyAppointment,
  titleForButtonChange,
  currentAppointment,
  editForm,
}) => (
  <div className="modal">
    <div className="modal-content">
      <div className="modal-content-header">
        <h1 className="modal-content-header__title">{title}</h1>
      </div>
      <div className="modal-content-body">{children}</div>
      <div className="modal-content-footer">
        <button
          className="modal-content-footer__cancel-button"
          type="button"
          onClick={() => setIsActiveModal(false)}
        >
          Отмена
        </button>
        <button
          className="modal-content-footer__confirm-button"
          type="button"
          onClick={() => modifyAppointment(currentAppointment._id, editForm)}
        >
          {titleForButtonChange}
        </button>
      </div>
    </div>
  </div>
);

export default Modal;
