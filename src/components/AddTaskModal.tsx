import React, { useState } from "react";
import { TaskItemInput } from "./TaskListItem";

type Props = {
  onSubmit: (TaskItemInput: TaskItemInput) => void;
  toggleModal: () => void;
  open: boolean;
};

export const AddTaskModal: React.FC<Props> = ({
  onSubmit,
  toggleModal,
  open
}) => {
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmitHandler = () => {
    if (title === "") {
      setErrorMessage("Please enter a title.");
    } else {
      setTitle("");
      onSubmit({
        title,
        date: new Date().toDateString()
      });
      toggleModal();
    }
  };

  const onCancelHandler = () => {
    setTitle("");
    toggleModal();
  };

  const onKeyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        onSubmitHandler();
        break;
      case "Escape":
        onCancelHandler();
        break;
      default:
        return;
    }
  };

  // Step : Replace root element with form Dialog component
  // https://material-ui.com/components/dialogs/#form-dialogs
  // Step : Replace label, input, and error message with TextField combo component
  // https://material-ui.com/components/text-fields/#validation
  return open ? (
    <>
      <label htmlFor={"title-input"}>Task Title</label>
      <input
        name={"TaskTitleInput"}
        id={"title-input"}
        placeholder={"Task Title"}
        value={title}
        autoFocus
        onChange={(e) => setTitle(e.target.value)}
        onKeyPress={onKeyHandler}
      />
      <button role={"button"} onClick={onSubmitHandler} disabled={title === ""}>
        Submit
      </button>
      <button onClick={toggleModal}>Cancel</button>
      {errorMessage && !title && <p style={{ color: "red" }}>{errorMessage}</p>}
    </>
  ) : null;
};
