import Modal from "src/components/Modal/Modal";

const DeleteModal = ({
  setIsActiveDeleteModal,
  deleteAppointment,
  currentAppointment,
  title,
  titleForDeleteButtonChange,
}) => {
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
