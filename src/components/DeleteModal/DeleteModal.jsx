import Modal from "../Modal/Modal";

const DeleteModal = ({
  setIsActiveDeleteModal,
  deleteAppointment,
  currentAppointment,
  title,
  titleForDeleteButtonChange,
}) => {
  console.log(titleForDeleteButtonChange);
  return (
    <Modal
      modifyAppointment={deleteAppointment}
      setIsActiveModal={setIsActiveDeleteModal}
      title={title}
      currentAppointment={currentAppointment}
      titleForButtonChange={titleForDeleteButtonChange}
    >
      <p className="modal-content-body__text">
        Вы действительно хотите удалить прием?
      </p>
    </Modal>
  );
};

export default DeleteModal;
