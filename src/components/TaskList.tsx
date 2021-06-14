import React from "react";
import { TaskItem, TaskListItem } from "./TaskListItem";

type Props = {
  tasks: TaskItem[];
  deleteTask: (deleteTaskInput: number) => void;
};

export const TaskList: React.FC<Props> = ({ tasks, deleteTask }) => (
  <>
    {tasks.length > 0 ? (
      // Step: Replace ul with Grid container component
      // https://material-ui.com/components/grid/#fluid-grids
      // Step: Make sure the TaskListItem is a Grid item in the Grid container
      // https://material-ui.com/components/grid/#fluid-grids
      <ul data-testid="task-list">
        {tasks.map((task, index) => (
          <TaskListItem
            key={`${task.title}-${index}`}
            task={task}
            deleteTask={deleteTask}
          />
        ))}
      </ul>
    ) : (
      // Step: Replace with h6 variant of Typography
      // https://material-ui.com/components/typography/#component
      <h4>No tasks have been added yet.</h4>
    )}
  </>
);
