import { useEffect, useState } from "react";
import { useTaskContext } from "../../../../../contexts/TaskProvider";
import { updateTaskApi } from "../../../../../api/task";
import { toast } from "react-toastify";
import { StatusEnum, Task } from "../../../../../types/task";
import { useValidateTask } from "../../../../../hooks/useValidateTask";
import { listStatus } from "../../../../../configs/status";

export const useEditTask = (task: Task, options: { isEditing: boolean }) => {
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string | undefined>("");
  const [status, setStatus] = useState<StatusEnum>(listStatus[0]?.value ?? "todo");
  const [dueDate, setDueDate] = useState<string>("");
  const { updateTask: updateTaskInStore } = useTaskContext();
  const { isInvalidTitle } = useValidateTask({ title });

  const handleChangeDesc = (value: string) => {
    setDesc(value);
  };

  const handleChangeTitle = (value: string) => {
    setTitle(value);
  };

  const updateTask = async () => {
    if (isInvalidTitle) {
      toast.error("Title is required!");
      return;
    }
    if (!task.id) {
      toast.error("Task id is required!");
      return;
    }
    const taskData = getTask();
    const updatedTask = await updateTaskApi(task.id, taskData);
    if (updatedTask.status === "error") {
      toast.error("Failed to update task!");
      return;
    }
    updateTaskInStore(task.id, {
      ...task,
      ...updatedTask.result
    });
    toast.success("Task updated successfully!");
  };

  const getTask = () => {
    const newTask: Task = {
      title,
      description: desc,
      status,
      dueDate: dueDate || null,
    };
    return newTask;
  };

  useEffect(() => {
    setTitle(task.title);
    setDesc(task.description);
    setStatus(task.status);
    setDueDate(task.dueDate || "");
  }, [task, options.isEditing]);

  return {
    title,
    desc,
    status,
    dueDate,
    isInvalidTitle,
    handleChangeDesc,
    handleChangeTitle,
    setStatus,
    setDueDate,
    updateTask,
  };
};
