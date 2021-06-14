import React from "react";

export type TaskItem = {
  id: number;
  title: string;
  date: string;
};

export type TaskItemInput = {
  title: string;
  date: string;
};

type Props = {
  task: TaskItem;
  deleteTask: (deleteTaskInput: number) => void;
};

export const TaskListItem: React.FC<Props> = ({ task, deleteTask }) => (
  // Step: Replace li with Card component
  // https://material-ui.com/components/cards/#simple-card
  // Step: Replace strong and p tags with Typography
  // https://material-ui.com/components/typography/#component
  // Step: Replace Delete button with 'error' variant MUI button
  // https://material-ui.com/components/buttons/#contained-buttons
  <li>
    <strong>{task.title}</strong>
    <p>{task.date}</p>
    <button onClick={() => deleteTask(task.id)}>Delete</button>
  </li>
);
