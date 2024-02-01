import TaskList from "./components/TaskList/TaskList";
import { useThemeContext } from "./theme/ThemeContextProvider";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { z, ZodError } from "zod";

type AppProps = {};

export const taskSchema = z.object({
  id: z.number(),
  text: z.string(),
  completed: z.boolean(),
});

export type Task = z.infer<typeof taskSchema>;

export const tryValidateTask: (task: Task, contextText: string) => boolean = (
  task,
  contextText
) => {
  try {
    const validatedTask = taskSchema.parse(task);
    if (validatedTask.text == "") {
      toast.error(`Task text is empty. {${contextText}}`);
      return false;
    }
    return true;
  } catch (e) {
    if (e instanceof ZodError) {
      toast.error(`Zod error. {${contextText}}`);
    }
    return false;
  }
};

const App: React.FC<AppProps> = () => {
  const { theme } = useThemeContext();
  const defaultTasks: Array<Task> = [];

  const loadTasksToLocalStorage: (newTasks: Array<Task>) => void = (
    newTasks
  ) => {
    localStorage.setItem("tasks", JSON.stringify({ tasks: [...newTasks] }));
  };

  useEffect(() => {
    defaultTasks.splice(0, defaultTasks.length);
    let isThereAnyTaskToRemove = false;

    const localStorageTasks: Array<Task> = JSON.parse(
      localStorage.getItem("tasks") ?? '{"tasks": []}'
    ).tasks;

    localStorageTasks.forEach((task) => {
      if (tryValidateTask(task, `id ${task.id} | while loading from storage`)) {
        defaultTasks.push(task);
      } else {
        isThereAnyTaskToRemove = true;
        toast.error(`Task ${task.id} will be removed`);
      }

      if (isThereAnyTaskToRemove) loadTasksToLocalStorage(defaultTasks);
    });
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
