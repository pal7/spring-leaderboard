import { useState, useImperativeHandle } from "react";
import Input from "./Input";

export default function AddNewUserForm({ onAddUser, ref }) {
  const initalState = {
    name: "",
    points: 0,
    age: "",
    street: "",
    suite: "",
    city: "",
    zipcode: "",
  };
  const [newUserFormData, setNewUserFormData] = useState(initalState);
  const [error, setError] = useState("");

  // Expose a reset function to parent via the ref
  useImperativeHandle(ref, () => ({
    reset() {
      setNewUserFormData(initalState);
      setError("");
    },
  }));

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    // Validation for age
    if (name === "age" && value < 0) {
      setError("Age cannot be a negative number");
      return;
    } else {
      setError("");
    }

    setNewUserFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: newUserFormData.name,
      points: Number(newUserFormData.points),
      age: Number(newUserFormData.age),
      address: {
        street: newUserFormData.street,
        suite: newUserFormData.suite,
        city: newUserFormData.city,
        zipcode: newUserFormData.zipcode,
      },
    };
    onAddUser(newUser);
    //reset on submission
    setNewUserFormData(initalState);
  };

  return (
    <div className='add-user-form'>
      <h2 className='add-user-form__heading'>Add New User</h2>
      <form onSubmit={handleSubmit} className='add-user-form__form'>
        <Input
          type='text'
          name='name'
          value={newUserFormData.name}
          onChange={handleChange}
          required
        >
          Name:
        </Input>
        <Input
          type='number'
          name='points'
          value={newUserFormData.points}
          onChange={handleChange}
          required
        >
          Points:
        </Input>
        <Input
          type='number'
          name='age'
          value={newUserFormData.age}
          onChange={handleChange}
          required
          min={0}
        >
          Age:
        </Input>
        <Input
          type='text'
          name='street'
          value={newUserFormData.street}
          onChange={handleChange}
          required
        >
          Street:
        </Input>
        <Input
          type='text'
          name='suite'
          value={newUserFormData.suite}
          onChange={handleChange}
        >
          Suite:
        </Input>
        <Input
          type='text'
          name='city'
          value={newUserFormData.city}
          onChange={handleChange}
          required
        >
          City:
        </Input>
        <Input
          type='text'
          name='zipcode'
          value={newUserFormData.zipcode}
          onChange={handleChange}
          required
        >
          Zipcode:
        </Input>
        {error && <p className='error'>{error}</p>}
        <button
          type='submit'
          className='add-user-form__button'
          aria-label='Add new user to the leaderboard table'
        >
          Add User
        </button>
      </form>
    </div>
  );
}
