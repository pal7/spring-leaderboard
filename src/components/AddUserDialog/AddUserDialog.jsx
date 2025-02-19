import Modal from "../Modal/Modal";
import AddNewUserForm from "./AddUserForm/AddNewUserForm";
import { useRef } from "react";
import "./AddUserDialog.css";

export default function AddUserDialog({ onAddUser, ref }) {
  const formRef = useRef(null);

  const handleClose = () => {
    if (formRef.current || ref.current) {
      formRef.current.reset();
    }
  };

  return (
    <Modal ref={ref} className='add-user-dialog' onClose={handleClose}>
      <AddNewUserForm onAddUser={onAddUser} ref={formRef} />
    </Modal>
  );
}
