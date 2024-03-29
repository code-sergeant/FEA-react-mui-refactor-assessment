import * as React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { AddTaskModal } from "../components/AddTaskModal";

describe("AddTaskModal", () => {
  const mockToggleOpen = jest.fn();
  const mockCreateTask = jest.fn().mockResolvedValue({
    id: 1,
    title: "TestTask1",
    date: new Date().toDateString()
  });

  beforeEach(() => {
    render(
      <AddTaskModal
        open
        onSubmit={mockCreateTask}
        toggleModal={mockToggleOpen}
      />
    );
  });

  it("renders the task title field", () => {
    expect(screen.getByLabelText("Task Title")).toBeInTheDocument();
  });

  it("disables the submit button if required fields are not filled", () => {
    expect(screen.getByRole("button", { name: "Submit" })).toBeDisabled();
  });

  it("enables submit button if required fields are provided", () => {
    const titleInput = screen.getByLabelText("Task Title") as HTMLInputElement;

    userEvent.type(titleInput, "Test Title");

    expect(titleInput.value).toEqual("Test Title");
    expect(screen.getByText("Submit")).not.toBeDisabled();
  });

  it("clears the task title field when submit is clicked", () => {
    userEvent.type(screen.getByLabelText("Task Title"), "Test Title");
    userEvent.click(screen.getByRole("button", { name: "Submit" }));

    waitFor(() => {
      expect(mockCreateTask).toHaveBeenCalled();
      expect(mockToggleOpen).toHaveBeenCalled();
      expect(
        (screen.getByLabelText("Task Title") as HTMLInputElement).value
      ).toEqual("");
    });
  });

  it("calls onSubmit with the proper input values when Submit is clicked", () => {
    const titleInput = screen.getByLabelText("Task Title") as HTMLInputElement;

    userEvent.type(titleInput, "Test Title");

    userEvent.click(screen.getByText("Submit"));

    expect(mockCreateTask).toHaveBeenCalledWith({
      title: "Test Title",
      date: new Date().toDateString()
    });
  });

  it("calls onCancel when 'Cancel' button is clicked", () => {
    userEvent.click(screen.getByText("Cancel"));

    waitFor(() => expect(mockToggleOpen).toHaveBeenCalled());
  });

  describe("Keyboard Shortcuts", () => {
    it("clears the task title field when user submits using the enter key", () => {
      const titleInput = screen.getByLabelText(
        "Task Title"
      ) as HTMLInputElement;

      userEvent.type(titleInput, "Test Title");

      userEvent.type(titleInput, "{enter}");

      waitFor(() => expect(titleInput.value).toEqual(""));
    });

    it("displays an error message if user presses Enter while required fields are empty", () => {
      userEvent.type(screen.getByLabelText("Task Title"), "{enter}");

      expect(screen.getByText("Please enter a title."));
    });

    it("calls onCancel when user presses Escape", () => {
      userEvent.type(screen.getByLabelText("Task Title"), "{escape}");

      waitFor(() => expect(mockToggleOpen).toHaveBeenCalled());
    });
  });
});
