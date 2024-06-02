import { useState } from "react";
import { useTaskContext } from "../../../../../contexts/TaskProvider";
import { createTaskApi } from "../../../../../api/task";
import { toast } from "react-toastify";
import { StatusEnum, Task } from "../../../../../types/task";
import { useValidateTask } from "../../../../../hooks/useValidateTask";
import { listStatus } from "../../../../../configs/status";

export const useAddItem = () => {
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [status, setStatus] = useState<StatusEnum>(listStatus[0]?.value ?? "todo");
  const { addTask: addTaskToStore } = useTaskContext();
  const { isInvalidTitle } = useValidateTask({ title });
  const [dueDate, setDueDate] = useState<string | null>(null);

  const handleChangeDesc = (value: string) => {
    setDesc(value);
  };

  const handleChangeTitle = (value: string) => {
    setTitle(value);
  };

  const addTask = async () => {
    if (isInvalidTitle) {
      toast.error("Title is required");
      return;
    }
    const task = getTask();
    const createdTask = await createTaskApi(task);
    if (createdTask.status === "error") {
      toast.error("Failed to create task");
      return;
    }
    addTaskToStore(createdTask.result);
    toast.success("Task added successfully!");
    resetDefault();
  };

  const getTask = () => {
    const newTask: Task = {
      title,
      description: desc,
      status,
      dueDate: dueDate || null
    };
    return newTask;
  };

  const resetDefault = () => {
    setTitle("");
    setDesc("");
    setStatus(listStatus[0]?.value ?? "todo");
  };

  return {
    title,
    status,
    desc,
    setStatus,
    isInvalidTitle,
    handleChangeDesc,
    handleChangeTitle,
    getTask,
    addTask,
    dueDate,
    setDueDate
  };
};
