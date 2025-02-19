import UserRow from "./UserRow/UserRow";
import "./UsersTable.css";

export default function UsersTable({
  users,
  onIncrement,
  onDecrement,
  onDelete,
  onSelect,
  onAddNewUser,
  sortField,
  sortOrder,
  onSort,
}) {
  const handleKeyDown = (e, callback) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      callback();
    }
  };

  return (
    <table className='users-table__table' role='grid'>
      <thead className='users-table__header'>
        <tr className='users-table__header-row'>
          <th className='users-table__header-cell'>
            <span className='visually-hidden'>Delete Actions</span>
          </th>
          <th
            className='users-table__header-cell users-table__header-cell--name'
            role='columnheader'
            tabIndex='0'
            onClick={() => onSort("name")}
            onKeyDown={(e) => handleKeyDown(e, () => onSort("name"))}
            aria-sort={
              sortField === "name"
                ? sortOrder === "asc"
                  ? "ascending"
                  : "descending"
                : "none"
            }
            aria-label={`Name column, sorted by ${
              sortField === "name"
                ? sortOrder === "asc"
                  ? "ascending"
                  : "descending"
                : "no"
            } order`}
          >
            Name
            {sortField === "name" && (
              <span className='users-table__sort-indicator'>
                {sortOrder === "asc" ? "↑" : "↓"}
              </span>
            )}
          </th>
          <th className='users-table__header-cell' role='columnheader'>
            <span className='visually-hidden'>Point Controls +</span>
          </th>
          <th className='users-table__header-cell' role='columnheader'>
            <span className='visually-hidden'>Point Controls -</span>
          </th>
          <th
            className='users-table__header-cell'
            role='columnheader'
            tabIndex='0'
            onClick={() => onSort("points")}
            onKeyDown={(e) => handleKeyDown(e, () => onSort("points"))}
            aria-sort={
              sortField === "points"
                ? sortOrder === "asc"
                  ? "ascending"
                  : "descending"
                : "none"
            }
            aria-label={`Points column, sorted by ${
              sortField === "points"
                ? sortOrder === "asc"
                  ? "ascending"
                  : "descending"
                : "no"
            } order`}
          >
            Points
            {sortField === "points" && (
              <span className='users-table__sort-indicator'>
                {sortOrder === "asc" ? "↑" : "↓"}
              </span>
            )}
          </th>
        </tr>
      </thead>

      <tbody className='users-table__body'>
        {users.map((user) => (
          <UserRow
            key={user.id}
            user={user}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            onDelete={onDelete}
            onSelect={onSelect}
            tabIndex='0'
          />
        ))}
      </tbody>

      <tfoot className='users-table__footer'>
        <tr className='users-table__footer-row'>
          <td className='users-table__footer-cell' colSpan={5}>
            <button
              className='users-table__add-button'
              onClick={onAddNewUser}
              tabIndex='0'
              aria-label='Add a new user, form opens in a dialog'
            >
              ➕ Add User
            </button>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
