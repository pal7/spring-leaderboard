import { render, screen, fireEvent } from "@testing-library/react";
import UserRow from "./UserRow";
import "@testing-library/jest-dom";

const mockUser = { id: 1, name: "Alice", points: 10 };

describe("UserRow - Increment and Decrement Points", () => {
  it("should increment user points when increment button is clicked", () => {
    const handleIncrement = jest.fn();
    render(
      <UserRow
        user={mockUser}
        onIncrement={handleIncrement}
        onDecrement={jest.fn()}
        onDelete={jest.fn()}
        onSelect={jest.fn()}
      />
    );

    const incrementButton = screen.getByRole("button", {
      name: /increment points for alice/i,
    });
    fireEvent.click(incrementButton);

    expect(handleIncrement).toHaveBeenCalledWith(mockUser.id);
  });

  it("should decrement user points when decrement button is clicked", () => {
    const handleDecrement = jest.fn();
    render(
      <UserRow
        user={mockUser}
        onIncrement={jest.fn()}
        onDecrement={handleDecrement}
        onDelete={jest.fn()}
        onSelect={jest.fn()}
      />
    );

    const decrementButton = screen.getByRole("button", {
      name: /decrement points for alice/i,
    });
    fireEvent.click(decrementButton);

    expect(handleDecrement).toHaveBeenCalledWith(mockUser.id);
  });
});
