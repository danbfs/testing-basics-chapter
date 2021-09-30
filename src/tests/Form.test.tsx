import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Form from "../Form";

const renderForm = () => render(<Form />);

const firstNameInput = screen.getByRole("input", {
  name: "firstName",
});

const lastNameInput = screen.getByRole("input", {
  name: "lastName",
});

const submitButton = screen.getByRole("button", {
  name: "submit",
});

describe("Form", () => {
  it("should allow user to submit a form", () => {
    renderForm();

    userEvent.type(firstNameInput, "first name");
    userEvent.type(lastNameInput, "last name");
    userEvent.click(submitButton);

  });
});
