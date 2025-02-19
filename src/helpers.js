const handleResponse = async (response) => {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP error! Status: ${response.status}, Body: ${text}`);
  }
  return await response.json();
};

export const fetchData = async () => {
  try {
    const res = await fetch(
      "https://67afd011dffcd88a67879894.mockapi.io/api/v1/leaderboard"
    );
    return await handleResponse(res);
  } catch (error) {
    console.error(
      "Error found while trying to fetch data from MockAPI:",
      error
    );
    throw error;
  }
};

export const updateUserPoints = async (userId, delta, users) => {
  const updatedUsers = users.map((user) =>
    user.id === userId ? { ...user, points: user.points + delta } : user
  );

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
      await handleResponse(response);
    }
    return updatedUsers;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const handleDelete = async (userId, users) => {
  try {
    const response = await fetch(
      `https://67afd011dffcd88a67879894.mockapi.io/api/v1/leaderboard/${userId}`,
      {
        method: "DELETE",
      }
    );
    await handleResponse(response);
    return users.filter((user) => user.id !== userId);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const handleAddUser = async (newUser) => {
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
    return await handleResponse(response);
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};
