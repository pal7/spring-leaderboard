export default function Input({ children, ...props }) {
  return (
    <label className='add-user-form__label'>
      {children}
      <input
        {...props}
        className='add-user-form__input'
        aria-label={`Enter the ${props.name} of the user`}
      />
    </label>
  );
}
