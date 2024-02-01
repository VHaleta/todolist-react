import toast from "react-hot-toast";
import { ZodError, z } from "zod";

export const taskSchema = z.object({
  id: z.number(),
  text: z.string(),
  completed: z.boolean(),
});

export type Task = z.infer<typeof taskSchema>;

export const tryValidateTask: (task: Task, contextText?: string) => boolean = (
  task,
  contextText
) => {
  try {
    const validatedTask = taskSchema.parse(task);
    if (validatedTask.text == "") {
      throwError("Task text cannot be empty", contextText);
      return false;
    }
    return true;
  } catch (e) {
    if (e instanceof ZodError) {
      throwError("Zod error", contextText);
    }
    return false;
  }
};

const throwError: (errorText: string, contextText?: string) => void = (
  errorText,
  contextText
) => {
  if (contextText == undefined) {
    toast.error(errorText);
  } else {
    toast.error(
      `${errorText} ${contextText == undefined ? "" : `{${contextText}}`}`
    );
  }
};
