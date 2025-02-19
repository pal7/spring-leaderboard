import { render, screen, fireEvent } from "@testing-library/react";
import UsersTable from "./UsersTable";
import "@testing-library/jest-dom";
import { useState } from "react";

const mockUsers = [
  { id: 1, name: "Alice", points: 10 },
  { id: 2, name: "Bob", points: 20 },
];

// Wrapper component to handle sorting state updates
const TestWrapper = () => {
  const [sortField, setSortField] = useState("points");
  const [sortOrder, setSortOrder] = useState("desc");

  const handleSort = (field) => {
    if (sortField !== field) {
      setSortField(field);
      setSortOrder("asc");
    } else {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    }
  };

  return (
    <UsersTable
      users={mockUsers}
      onIncrement={jest.fn()}
      onDecrement={jest.fn()}
      onDelete={jest.fn()}
      onSelect={jest.fn()}
      onAddNewUser={jest.fn()}
      sortField={sortField}
      sortOrder={sortOrder}
      onSort={handleSort}
    />
  );
};

describe("UsersTable - Sorting Points & Add User Button", () => {
  it("should toggle sorting order when clicking the Points header", () => {
    render(<TestWrapper />);

    const pointsHeader = screen
      .getAllByRole("columnheader")
      .find((header) => header.textContent.includes("Points"));

    // Initial state should be "descending"
    expect(pointsHeader).toHaveAttribute("aria-sort", "descending");

    // Click once -> Should become "ascending"
    fireEvent.click(pointsHeader);
    expect(pointsHeader).toHaveAttribute("aria-sort", "ascending");

    // Click again -> Should become "descending"
    fireEvent.click(pointsHeader);
    expect(pointsHeader).toHaveAttribute("aria-sort", "descending");

    // Click again -> Should go back to "ascending"
    fireEvent.click(pointsHeader);
    expect(pointsHeader).toHaveAttribute("aria-sort", "ascending");
  });

  //Add User Button Click

  it("should call onAddNewUser when Add User button is clicked", () => {
    const mockOnAddNewUser = jest.fn();
    render(
      <UsersTable
        users={mockUsers}
        onIncrement={jest.fn()}
        onDecrement={jest.fn()}
        onDelete={jest.fn()}
        onSelect={jest.fn()}
        onAddNewUser={mockOnAddNewUser}
        sortField='points'
        sortOrder='none'
        onSort={jest.fn()}
      />
    );

    const addButton = screen.getByRole("button", {
      name: /add a new user, form opens in a dialog/i,
    });

    fireEvent.click(addButton);
    expect(mockOnAddNewUser).toHaveBeenCalled();
  });
});
