import TaskItem from "../TaskItem/TaskItem";
import { type Task, tryValidateTask } from "../../App";
import { useEffect, useState } from "react";
import NightModeToggle from "../NightModeToggle/NightModeToggle";

import { Button, TextField, Box, Typography } from "@mui/material";

import {
  addButtonSx,
  deleteComplitedButtonSx,
  inputTaskSx,
  addTaskFormSx,
  taskListContainerSx,
  headerBoxSx,
  headerHSx,
} from "./TaskListStyles";

type TaskListProps = {
  tasks: Array<Task>;
  updateTasks: (tasks: Array<Task>) => void;
};

const TaskList = ({ tasks, updateTasks }: TaskListProps) => {
  console.log(tasks);
  const [inputState, setInputState] = useState("");
  const [update, updateComponent] = useState(true);

  useEffect(() => {
    updateComponent(!update);
  }, [tasks]);

  const onRemove = (id: number) => {
    const copy = [...tasks];
    const removeIndex = copy.findIndex((task) => task.id == id);
    copy.splice(removeIndex, 1);
    updateTasks(copy);
  };

  const onToggle = (id: number) => {
    const copy = [...tasks];
    const updateIndex = copy.findIndex((task) => task.id == id);
    copy[updateIndex].completed = !copy[updateIndex].completed;
    updateTasks(copy);
  };

  const onEdit = (id: number, newText: string) => {
    const copy = [...tasks];
    const updateIndex = copy.findIndex((task) => task.id == id);
    copy[updateIndex].text = newText;
    updateTasks(copy);
  };

  const onAddClick = () => {
    const isEmpty = tasks.length <= 0;
    const newTask = {
      id: isEmpty ? 0 : tasks[tasks.length - 1].id + 1,
      text: inputState,
      completed: false,
    };
    if (!tryValidateTask(newTask, "On adding task")) return;
    const copy = [...tasks, newTask];
    console.log(copy);
    updateTasks(copy);
    setInputState("");
  };

  const onDeleteAllComplitedClick = () => {
    const copy = tasks.filter((task) => task.completed == false);
    updateTasks(copy);
  };

  const isEmpty: boolean = tasks.length === 0;

  return (
    <Box sx={taskListContainerSx}>
      <Box sx={headerBoxSx}>
        <Typography variant="h2" sx={headerHSx}>
          Task list
        </Typography>
        <NightModeToggle />
      </Box>
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
        tasks.map((task) => (
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
  );
};

export default TaskList;
