import Modal from "../Modal/Modal";
// import { useEffect } from "react";
import "./UserDetailsDialog.css";

const UserDetailsDialog = ({ user, onClose, ref }) => {
  if (!user) return null; // Do not render if no user is selected

  return (
    <Modal ref={ref} className='user-details-modal'>
      <h2>User Details</h2>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Points:</strong> {user.points}
      </p>
      <p>
        <strong>Age:</strong> {user.age}
      </p>
      <p>
        <strong>Address:</strong>
        <span className='user-details-address'>
          <p>
            {user.address.street}, {user.address.suite}
          </p>
          <p>
            {user.address.city}, {user.address.zipcode}
          </p>
        </span>
      </p>
    </Modal>
  );
};

export default UserDetailsDialog;
