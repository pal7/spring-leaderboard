export const filterUsers = (users, searchTerm) => {
  return users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const sortUsers = (users, sortField, sortOrder) => {
  return users.sort((a, b) => {
    if (!sortField) return 0;
    const aValue =
      typeof a[sortField] === "string"
        ? a[sortField].toLowerCase()
        : a[sortField];
    const bValue =
      typeof b[sortField] === "string"
        ? b[sortField].toLowerCase()
        : b[sortField];
    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
};
