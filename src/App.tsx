import TaskList from "./components/TaskList/TaskList";
import "./App.css";

type AppProps = {};

export type Task = {
  id: number,
  text: string,
  completed: boolean
}

const defaultTasks: Array<Task> = [
  {id: 0, text: "Some task", completed: false},
  {id: 1, text: "Some task", completed: true}
];

const App: React.FC<AppProps> = () => {
  return (
    <div>
      <TaskList/>
    </div>
  );
};

export default App;
