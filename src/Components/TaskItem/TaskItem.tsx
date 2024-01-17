import { useRef, useState } from "react";
import { type Task } from "../../App"
import "./TaskItem.css"

type TaskProps = {
    task: Task,
    onRemove: (id: number) => void,
    onToggle: (id: number) => void,
    onEdit: (id: number, newText: string) => void
}

const TaskItem = ({ task, onRemove, onToggle, onEdit }: TaskProps) => {
  const [isEditingState, setIsEditingState] = useState(false)
  const [inputTextState, setTextInputState] = useState(task.text)

  const beginEditing = () => {
    setIsEditingState(true)
  }

  const finishEditing = () => {
    setIsEditingState(false)
    onEdit(task.id, inputTextState)
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInputState(e.target.value)
  }

  const textDec = task.completed ? "line-through" : "";
  return (
    <div className="task-item">
      <input
        type="checkbox"
        className="task-item-checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <div className="task-item-text" style={{ textDecoration: textDec }}>
        {isEditingState ? (
          <input
            defaultValue={task.text}
            className="task-item-edit-input task-item-text"
            onChange={(e) => onInputChange(e)}
          ></input>
        ) : (
          task.text
        )}
      </div>
      <button
        className="task-item-edit-button"
        onClick={() => (isEditingState ? finishEditing() : beginEditing())}
      >
        {isEditingState ? "Finish" : "Edit"}
      </button>
      <button
        className="task-item-remove-button"
        onClick={() => onRemove(task.id)}
      >
        Remove
      </button>
    </div>
  );
};

export default TaskItem