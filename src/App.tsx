import TaskList from "./components/TaskList/TaskList";
import "./App.css";
import { useThemeContext } from "./theme/ThemeContextProvider";
import { ThemeProvider, CssBaseline } from "@mui/material";
import NightModeToggle from "./components/NightModeToggle/NightModeToggle";

type AppProps = {};

export type Task = {
  id: number;
  text: string;
  completed: boolean;
};

const App: React.FC<AppProps> = () => {
  const { theme } = useThemeContext();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline></CssBaseline>
      <TaskList />
    </ThemeProvider>
  );
};

export default App;
