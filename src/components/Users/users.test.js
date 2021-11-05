import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Users } from "./";
import { UserCard } from "./UserCard";

jest.spyOn(console, "error").mockImplementation(() => {});

describe("<Users />", () => {
  const users = [
    { id: 123, firstName: "Mo", lastName: "Dwina", email: "b@b.com" },
  ];
  test("renders component", () => {
    const { container } = render(<Users users={users} />);
    expect(container).toMatchSnapshot();
  });
});

describe("<UserCard />", () => {
  const handleDelete = jest.fn();
  const user = {
    firstName: "Mo",
    lastName: "Dwina",
    email: "b@b.com",
    id: "123",
  };
  const { queryByText } = render(
    <UserCard user={user} handleDelete={handleDelete} />
  );

  const button = queryByText("X");
  fireEvent.click(button);

  expect(handleDelete).toHaveBeenCalledTimes(1);
});
