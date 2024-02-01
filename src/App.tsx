import TaskList from "./components/TaskList/TaskList";
import { useThemeContext } from "./theme/ThemeContextProvider";
import { ThemeProvider, CssBaseline } from "@mui/material";

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
