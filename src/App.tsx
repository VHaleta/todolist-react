import TaskList from "./components/TaskList/TaskList";
import { useThemeContext } from "./theme/ThemeContextProvider";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import {
  loadTasksFromStorage,
  loadTasksToLocalStorage,
} from "./helpers/localStorageHelper";
import { Task } from "./helpers/typesHelper";

type AppProps = {};

const App: React.FC<AppProps> = () => {
  const { theme } = useThemeContext();
  const defaultTasks: Array<Task> = [];

  useEffect(() => {
    loadTasksFromStorage(defaultTasks);
  }, []);

  const [tasksState, setTasksState] = useState(defaultTasks);

  const updateTasks: (newTasks: Array<Task>) => void = (newTasks) => {
    setTasksState(newTasks);
    loadTasksToLocalStorage(newTasks);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline></CssBaseline>
      <Toaster />
      <TaskList tasks={tasksState} updateTasks={updateTasks} />
    </ThemeProvider>
  );
};

export default App;
