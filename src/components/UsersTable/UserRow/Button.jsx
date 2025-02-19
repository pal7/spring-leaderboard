export default function Button({ children, ...props }) {
  return (
    <button {...props} className='user-row__action-button'>
      {children}
    </button>
  );
}
