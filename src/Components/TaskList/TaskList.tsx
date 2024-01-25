import TaskItem from "../TaskItem/TaskItem";
import { type Task } from "../../App";
import { useState } from "react";

import {
  Button,
  TextField,
  Box,
  ThemeProvider,
  createTheme,
  Typography,
} from "@mui/material";

import {
  addButtonSx,
  deleteComplitedButtonSx,
  inputTaskSx,
  addTaskFormSx,
  taskListContainerSx,
} from "./TaskListStyles";

import { titleTheme, emptyListMessageTheme } from "./TaskListThemes";

type TaskListProps = {
  tasks?: Array<Task>;
};

const theme = createTheme({
  typography: {
    h2: titleTheme,
    h5: emptyListMessageTheme,
  },
});

const TaskList = ({ tasks }: TaskListProps) => {
  const defaultTasks = [];
  if (tasks != undefined) defaultTasks.push(...tasks);
  else {
    defaultTasks.push(
      ...JSON.parse(localStorage.getItem("tasks") ?? '{"tasks": []}').tasks
    );
  }

  const [tasksState, setTasksState] = useState(defaultTasks);
  const [inputState, setInputState] = useState("");

  const loadTasksToStorage = (newTasks: Array<Task>) => {
    localStorage.setItem("tasks", JSON.stringify({ tasks: [...newTasks] }));
  };

  const onRemove = (id: number) => {
    const copy = [...tasksState];
    const removeIndex = copy.findIndex((task) => task.id == id);
    copy.splice(removeIndex, 1);
    setTasksState(copy);
    loadTasksToStorage(copy);
  };

  const onToggle = (id: number) => {
    const copy = [...tasksState];
    const updateIndex = copy.findIndex((task) => task.id == id);
    copy[updateIndex].completed = !copy[updateIndex].completed;
    setTasksState(copy);
    loadTasksToStorage(copy);
  };

  const onEdit = (id: number, newText: string) => {
    const copy = [...tasksState];
    const updateIndex = copy.findIndex((task) => task.id == id);
    copy[updateIndex].text = newText;
    setTasksState(copy);
    loadTasksToStorage(copy);
  };

  const onAddClick = () => {
    if (inputState == "") return;
    const isEmpty = tasksState.length <= 0;
    const copy = [
      ...tasksState,
      {
        id: isEmpty ? 0 : tasksState[tasksState.length - 1].id + 1,
        text: inputState,
        completed: false,
      },
    ];
    console.log(copy);
    setTasksState(copy);
    setInputState("");
    loadTasksToStorage(copy);
  };

  const onDeleteAllComplitedClick = () => {
    const copy = tasksState.filter((task) => task.completed == false);
    setTasksState(copy);
    loadTasksToStorage(copy);
  };

  const isEmpty: boolean = tasksState.length === 0;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={taskListContainerSx}>
        <Typography variant="h2">Task list</Typography>
        <Box sx={addTaskFormSx}>
          <TextField
            variant="outlined"
            size="small"
            label="Task"
            sx={inputTaskSx}
            onChange={(e) => setInputState(e.target.value)}
            value={inputState}
          ></TextField>
          <Button
            variant="contained"
            sx={addButtonSx}
            onClick={() => onAddClick()}
          >
            Add
          </Button>
          <Button
            variant="contained"
            sx={deleteComplitedButtonSx}
            onClick={() => onDeleteAllComplitedClick()}
          >
            Delete complited
          </Button>
        </Box>
        {isEmpty ? (
          <Typography variant="h5">No tasks to display</Typography>
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
      </Box>
    </ThemeProvider>
  );
};

export default TaskList;
