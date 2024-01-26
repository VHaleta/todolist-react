import { useState } from "react";
import { type Task } from "../../App";
import { Button, Box, TextField, Checkbox } from "@mui/material";
import {
  editButtonSx,
  removeButtonSx,
  taskTextBoxSx,
  editTextFieldSx,
  taskItemBoxSx,
} from "./TaskItemStyles";

type TaskProps = {
  task: Task;
  onRemove: (id: number) => void;
  onToggle: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
};

const TaskItem = ({ task, onRemove, onToggle, onEdit }: TaskProps) => {
  const [isEditingState, setIsEditingState] = useState(false);
  const [inputTextState, setTextInputState] = useState(task.text);

  const beginEditing: () => void = () => {
    setIsEditingState(true);
  };

  const onEditInputKeyUp: (e: React.KeyboardEvent<HTMLDivElement>) => void = (
    e
  ) => {
    if (e.key === "Enter") {
      finishEditing();
    }
  };

  const finishEditing: () => void = () => {
    if (inputTextState == "") {
      alert("Task text cannot be empty");
      return;
    }
    setIsEditingState(false);
    onEdit(task.id, inputTextState);
  };

  const onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void = (e) => {
    setTextInputState(e.target.value);
  };

  const textDec = task.completed ? "line-through" : "";
  return (
    <Box sx={taskItemBoxSx}>
      <Checkbox checked={task.completed} onChange={() => onToggle(task.id)} />
      <Box sx={{ ...taskTextBoxSx, textDecoration: textDec }}>
        {isEditingState ? (
          <TextField
            variant="standard"
            defaultValue={task.text}
            onChange={(e) => onInputChange(e)}
            sx={editTextFieldSx}
            onKeyUp={(e) => onEditInputKeyUp(e)}
          />
        ) : (
          task.text
        )}
      </Box>
      <Button
        sx={editButtonSx}
        variant="contained"
        size="small"
        onClick={() => (isEditingState ? finishEditing() : beginEditing())}
      >
        {isEditingState ? "Finish" : "Edit"}
      </Button>
      <Button
        sx={removeButtonSx}
        variant="contained"
        size="small"
        onClick={() => onRemove(task.id)}
      >
        Remove
      </Button>
    </Box>
  );
};

export default TaskItem;
