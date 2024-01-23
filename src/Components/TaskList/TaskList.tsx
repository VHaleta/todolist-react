import TaskItem from "../TaskItem/TaskItem";
import { type Task } from "../../App";
import { useState } from "react";
import "./TaskList.css"

import { Button } from "@mui/material";

import { addButtonSx } from "./TaskListStyles";

type TaskListProps = {
  tasks?: Array<Task>
}

const TaskList = ({ tasks }: TaskListProps) => {
  const defaultTasks = []
  if (tasks != undefined)
    defaultTasks.push(...tasks)
  else{
    defaultTasks.push(...JSON.parse(localStorage.getItem("tasks")?? '{\"tasks\": []}').tasks)
  }

  const [tasksState, setTasksState] = useState(defaultTasks)
  const [inputState, setInputState] = useState("")

  const loadTasksToStorage = (newTasks: Array<Task>) => {
    localStorage.setItem("tasks", JSON.stringify({ tasks: [...newTasks] }))
  }

  const onRemove = (id: number) => {
    const copy = [...tasksState]
    const removeIndex = copy.findIndex((task) => task.id == id)
    copy.splice(removeIndex, 1)
    setTasksState(copy)
    loadTasksToStorage(copy)
  };

  const onToggle = (id: number) => {
    const copy = [...tasksState];
    const updateIndex = copy.findIndex((task) => task.id == id)
    copy[updateIndex].completed = !copy[updateIndex].completed
    setTasksState(copy)
    loadTasksToStorage(copy)
  };

  const onEdit = (id: number, newText: string) => {
    const copy = [...tasksState];
    const updateIndex = copy.findIndex((task) => task.id == id)
    copy[updateIndex].text = newText;
    setTasksState(copy)
    loadTasksToStorage(copy)
  }

  const onAddClick = () => {
    if (inputState == "") return;
    const isEmpty = tasksState.length <= 0
    const copy = [...tasksState, { id: (isEmpty) ? 0 : tasksState[tasksState.length - 1].id + 1, text: inputState, completed: false }]
    console.log(copy)
    setTasksState(copy)
    setInputState("")
    loadTasksToStorage(copy)
  };

  const onDeleteAllComplitedClick = () => {
    const copy = tasksState.filter((task) => task.completed == false);
    setTasksState(copy)
    loadTasksToStorage(copy)
  }

  const isEmpty: boolean = tasksState.length === 0;
  return (
    <div className="task-list">
      <div className="task-list-title">Task list</div>
      <div className="add-task-form">
        <input
          className="add-task-input"
          onChange={(e) => {
            setInputState(e.target.value);
          }}
          value={inputState}
        ></input>
        <Button
          variant="contained"
          sx={addButtonSx}
          onClick={() => onAddClick()}
        >
          Add
        </Button>
        <button
          className="delete-all-complited-button"
          onClick={() => onDeleteAllComplitedClick()}
        >
          Delete all complited
        </button>
      </div>
      {isEmpty ? (
        <div className="task-list-empty">No tasks to display</div>
      ) : (
        tasksState.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onRemove={onRemove}
            onToggle={onToggle}
            onEdit={onEdit}
          ></TaskItem>
        ))
      )}
    </div>
  );
};

export default TaskList