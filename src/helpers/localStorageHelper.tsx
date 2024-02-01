import toast from "react-hot-toast";
import { Task, tryValidateTask } from "./typesHelper";

export const loadTasksToLocalStorage: (newTasks: Array<Task>) => void = (
  newTasks
) => {
  localStorage.setItem("tasks", JSON.stringify({ tasks: [...newTasks] }));
};

export const loadTasksFromStorage: (defaultTasks: Array<Task>) => void = (
  defaultTasks
) => {
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
};
