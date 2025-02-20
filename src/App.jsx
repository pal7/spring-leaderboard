import { useEffect, useState, useRef } from "react";
import UsersTable from "./components/UsersTable/UsersTable";
import Header from "./components/Header/Header";
import UserDetailsDialog from "./components/UserDetailsDialog/UserDetailsDialog";
import AddUserDialog from "./components/AddUserDialog/AddUserDialog";
import "./App.css";
import "./global.css";
import { fetchData, updateUserPoints, deleteUser, addUser } from "./helpers";
import { filterUsers, sortUsers } from "./utils";

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("points");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedUser, setSelectedUser] = useState(null);

  const addUserDialogRef = useRef(null);
  const userDetailsDialogRef = useRef(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchData();
        setUsers(data);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      userDetailsDialogRef.current?.showModal();
    }
  }, [selectedUser]);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const handleIncrement = async (userId) => {
    try {
      const updatedUsers = await updateUserPoints(userId, 1, users);
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error incrementing user points:", error);
    }
  };

  const handleDecrement = async (userId) => {
    try {
      const updatedUsers = await updateUserPoints(userId, -1, users);
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error decrementing user points:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const updatedUsers = await deleteUser(userId, users);
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  const handleAddNewUser = async (newUser) => {
    try {
      const createdUser = await addUser(newUser);
      setUsers((prevUsers) => [...prevUsers, createdUser]);
      addUserDialogRef.current?.close();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleShowAddUserDialog = () => {
    addUserDialogRef.current?.showModal();
  };

  const filteredUsers = filterUsers(users, searchTerm);
  const sortedUsers = sortUsers(filteredUsers, sortField, sortOrder);
  const displayedUsers = sortedUsers.slice(0, 10);

  return (
    <div className='user-dashboard'>
      <Header onSearch={handleSearch}></Header>
      <AddUserDialog ref={addUserDialogRef} onAddUser={handleAddNewUser} />
      <UserDetailsDialog ref={userDetailsDialogRef} user={selectedUser} />
      <UsersTable
        users={displayedUsers}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onDelete={handleDeleteUser}
        onSelect={handleSelectUser}
        onAddNewUser={handleShowAddUserDialog}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={handleSort}
      />
    </div>
  );
}

export default App;
