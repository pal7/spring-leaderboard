// import { useState } from 'react'
import { useEffect, useState, useRef } from "react";
import "./App.css";
import UsersTable from "./components/UsersTable";
import Header from "./components/Header";
import UserDetailsDialog from "./components/UserDetailsDialog";
import AddUserDialog from "./components/AddUserDialog";

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("points");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedUser, setSelectedUser] = useState(null);

  const addUserDialogRef = useRef(null);
  const userDetailsDialogRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://67afd011dffcd88a67879894.mockapi.io/api/v1/leaderboard"
        );
        const data = await res.json();
        const slicedData = data.slice(0, 10);
        const updatedData = slicedData.map((user) => ({ ...user }));
        setUsers(updatedData);
      } catch (error) {
        console.error(
          " Error found while trying to fetch data from MockAPI:",
          error
        );
      }
    };

    fetchData();
  }, []);

  function handleSelectUser(user) {
    setSelectedUser(user);
    userDetailsDialogRef.current?.showModal();
  }

  const updateUserPoints = async (userId, delta) => {
    //locally update for immediate UI feedback

    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, points: user.points + delta } : user
    );
    setUsers(updatedUsers);

    //  Perform the API call to update the user on the server
    try {
      const updatedUser = updatedUsers.find((user) => user.id === userId);
      if (updatedUser) {
        const response = await fetch(
          `https://67afd011dffcd88a67879894.mockapi.io/api/v1/leaderboard/${userId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),
          }
        );
        // const data = await response.json();
        // console.log("User updated:", data);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  function handleIncrement(userId) {
    updateUserPoints(userId, 1);
  }

  function handleDecrement(userId) {
    updateUserPoints(userId, -1);
  }

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(
        `https://67afd011dffcd88a67879894.mockapi.io/api/v1/leaderboard/${userId}`,
        {
          method: "DELETE",
        }
      );
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleteing user: ", error);
    }
  };

  function handleSearch(term) {
    setSearchTerm(term);
  }

  function handleSort(field) {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  }

  const handleAddUser = async (newUser) => {
    try {
      const response = await fetch(
        "https://67afd011dffcd88a67879894.mockapi.io/api/v1/leaderboard",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );
      const createdUser = await response.json();
      setUsers((prevUsers) => [...prevUsers, createdUser]);
      addUserDialogRef.current?.close();
    } catch (error) {
      console.error("Error adding user: ", error);
    }
  };

  function handleShowAddUserDialog() {
    addUserDialogRef.current?.showModal();
  }

  const filteredUsers = users
    .filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      if (sortOrder === "asc") {
        return a[sortField] > b[sortField] ? 1 : -1;
      } else {
        return a[sortField] < b[sortField] ? 1 : -1;
      }
    });

  // console.log(selectedUser);
  return (
    <div className='user-dashboard'>
      <Header onSearch={handleSearch}></Header>
      <AddUserDialog ref={addUserDialogRef} onAddUser={handleAddUser} />
      <UserDetailsDialog
        ref={userDetailsDialogRef}
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
      <UsersTable
        users={filteredUsers}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onDelete={handleDelete}
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
