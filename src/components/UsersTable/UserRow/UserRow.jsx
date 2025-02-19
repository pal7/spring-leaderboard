import Button from "./Button";
export default function UserRow({
  user,
  onIncrement,
  onDecrement,
  onDelete,
  onSelect,
}) {
  const handleKeyDown = (e, callback) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      callback();
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(user.id);
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    onIncrement(user.id);
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    onDecrement(user.id);
  };

  return (
    <tr className='users-table__row'>
      <td className='users-table__cell'>
        <Button onClick={handleDelete} aria-label={`Delete user ${user.name}`}>
          ❌
        </Button>
      </td>
      <td
        className='users-table__cell users-table__cell--name'
        onClick={() => onSelect(user)}
        onKeyDown={(e) => handleKeyDown(e, () => onSelect(user))}
        tabIndex='0'
        aria-label={`Select user ${user.name}, and opens details in a dialog`}
      >
        {user.name}
      </td>
      <td className='users-table__cell'>
        <Button
          onClick={handleIncrement}
          aria-label={`Increment points for ${user.name}`}
        >
          ➕
        </Button>
      </td>
      <td className='users-table__cell'>
        <Button
          onClick={handleDecrement}
          aria-label={`Decrement points for ${user.name}`}
        >
          ➖
        </Button>
      </td>
      <td
        className='users-table__cell users-table__cell--points'
        role='gridcell'
        aria-label={`Points for ${user.name}: ${user.points}`}
      >
        {user.points}
      </td>
    </tr>
  );
}
