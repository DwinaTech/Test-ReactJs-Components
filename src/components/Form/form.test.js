import React from "react";
import { render } from "@testing-library/react";
import { Form } from "./";

describe("<Form />", () => {
  const user = {
    firstName: "Mo",
    lastName: "Dwina",
    email: "b@b.com",
  };

  test("renders component", () => {
    const { container } = render(
      <Form user={user} handleSubmit={() => {}} handleChange={() => {}} />
    );
    expect(container).toMatchSnapshot();
  });

  test("should disable the button when one of user data is missing", () => {
    const { queryByText } = render(
      <Form user={{}} handleSubmit={() => {}} handleChange={() => {}} />
    );
    const button = queryByText("Submit");
    expect(button.classList).toContain("disabled");
  });

  test("should remove disable class from the button when all user data is provided", () => {
    const { queryByText } = render(
      <Form user={user} handleSubmit={() => {}} handleChange={() => {}} />
    );
    const button = queryByText("Submit");
    expect(button.classList).not.toContain("disabled");
  });
});
