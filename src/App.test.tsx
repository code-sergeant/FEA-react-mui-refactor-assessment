import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    render(<App />);
  });
  it("renders the initial app state successfully", () => {
    expect(screen.getByText(/task tracker/i)).toBeInTheDocument();
    expect(
      screen.getByText(/no tasks have been added yet./i)
    ).toBeInTheDocument();
    expect(screen.getByText(/add task/i)).toBeInTheDocument();
  });

  describe("AddTaskModal", () => {
    it("opens the AddTaskModal modal when 'Add Task' is clicked", () => {
      userEvent.click(screen.getByText("Add Task"));

      expect(screen.getByText("Task Title"));
    });

    it("closes the modal when a task is successfully submitted", () => {
      userEvent.click(screen.getByText("Add Task"));
      userEvent.type(screen.getByLabelText("Task Title"), "Test Title");
      userEvent.click(screen.getByText("Submit"));

      waitFor(() =>
        expect(screen.queryByText("Task Title")).not.toBeInTheDocument()
      );
    });
  });

  describe("Happy path integration test", () => {
    it("should successfully add tasks to the list", () => {
      userEvent.click(screen.getByText("Add Task"));
      userEvent.type(screen.getByLabelText("Task Title"), "AddedTask1");
      userEvent.click(screen.getByText("Submit"));

      expect(screen.getByText("AddedTask1"));
    });

    it("should successfully delete the correct task from the list", () => {
      userEvent.click(screen.getByText("Add Task"));
      userEvent.type(screen.getByLabelText("Task Title"), "AddedTask1");
      userEvent.click(screen.getByText("Submit"));
      userEvent.click(screen.getByText("Add Task"));
      userEvent.type(screen.getByLabelText("Task Title"), "AddedTask2");
      userEvent.click(screen.getByText("Submit"));
      userEvent.click(screen.getByText("Add Task"));
      userEvent.type(screen.getByLabelText("Task Title"), "AddedTask3");
      userEvent.click(screen.getByText("Submit"));

      expect(screen.getByText("AddedTask1"));
      expect(screen.getByText("AddedTask2"));
      expect(screen.getByText("AddedTask3"));

      const addedTask2Button = screen.getAllByText("Delete")[1];

      userEvent.click(addedTask2Button);

      expect(screen.getByText("AddedTask1"));
      expect(screen.getByText("AddedTask3"));
      expect(screen.queryByText("AddedTask2")).not.toBeInTheDocument();
    });
  });
});
