import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Form from "../Form";

describe("Form", () => {
  const mockSaveData = jest.fn();

  const renderForm = () => render(<Form saveData={mockSaveData} />);
  renderForm();

  const firstNameInput = screen.getByRole("textbox", {
    name: "First name",
  });

  const lastNameInput = screen.getByRole("textbox", {
    name: "Last name",
  });

  const submitButton = screen.getByRole("button", {
    name: "Submit",
  });

  it("should allow user to submit a form", async () => {
    userEvent.type(firstNameInput, "first name");
    userEvent.type(lastNameInput, "last name");
    userEvent.click(submitButton);

    await waitFor(() => expect(mockSaveData).toHaveBeenCalled(), {
      timeout: 5000,
    });
  });
});
