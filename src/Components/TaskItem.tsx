import { type Task } from "../App"

type TaskProps = {
    task: Task,
    onRemove: (id: number) => void,
    onToggle: (id: number) => void
}

const TaskItem = ({ task, onRemove, onToggle }: TaskProps) => {
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
        {task.text}
      </div>
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