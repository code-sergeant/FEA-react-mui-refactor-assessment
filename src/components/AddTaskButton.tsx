import * as React from "react";

type Props = {
  addTaskHandler: () => void;
};

// Step 1: https://material-ui.com/components/buttons/#contained-buttons
export const AddTaskButton: React.FC<Props> = ({ addTaskHandler }) => (
  <button autoFocus onClick={addTaskHandler}>
    Add Task
  </button>
);
