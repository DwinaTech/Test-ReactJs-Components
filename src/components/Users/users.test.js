import React from "react";
import { render } from "@testing-library/react";
import { Users } from "./";

describe("<Users />", () => {
  const users = [
    { id: 123, firstName: "Mo", lastName: "Dwina", email: "b@b.com" },
  ];
  test("renders component", () => {
    const { container } = render(<Users users={users} />);
    expect(container).toMatchSnapshot();
  });
});
