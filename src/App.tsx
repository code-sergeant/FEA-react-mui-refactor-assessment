import React, { useState } from "react";
import { TaskItem, TaskItemInput } from "./components/TaskListItem";
import { AddTaskButton } from "./components/AddTaskButton";
import { AddTaskModal } from "./components/AddTaskModal";
import { TaskList } from "./components/TaskList";

import "./styles.css";

export default function App() {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  const addTaskHandler = (addTaskInput: TaskItemInput) => {
    const taskItem = { ...addTaskInput, id: tasks.length };
    setTasks([...tasks, taskItem]);
    setIsTaskModalOpen(false);
  };

  const deleteTaskHandler = (taskId: number) =>
    setTasks(tasks.filter((task) => task.id !== taskId));

  return (
    // Step: Combine h1 and AddTaskButton into a Simple AppBar
    // https://material-ui.com/components/app-bar/#simple-app-bar
    <div className="App">
      <h1>Task Tracker</h1>
      <AddTaskButton
        addTaskHandler={() => setIsTaskModalOpen(!isTaskModalOpen)}
      />
      <AddTaskModal
        onSubmit={addTaskHandler}
        toggleModal={() => setIsTaskModalOpen(false)}
        open={isTaskModalOpen}
      />
      <TaskList tasks={tasks} deleteTask={deleteTaskHandler} />
    </div>
  );
}
