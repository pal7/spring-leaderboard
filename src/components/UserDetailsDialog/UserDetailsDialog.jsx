import Modal from "../Modal/Modal";
import "./UserDetailsDialog.css";

const UserDetailsDialog = ({ user, ref }) => {
  if (!user) return null;

  return (
    <Modal ref={ref} className='user-details-dialog'>
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
          <span>
            {user.address.street}, {user.address.suite}
          </span>
          <span>
            {user.address.city}, {user.address.zipcode}
          </span>
        </span>
      </p>
    </Modal>
  );
};

export default UserDetailsDialog;
