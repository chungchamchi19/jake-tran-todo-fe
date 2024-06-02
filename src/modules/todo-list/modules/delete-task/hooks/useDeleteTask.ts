import { toast } from "react-toastify";
import { deleteTaskApi } from "../../../../../api/task";
import { useTaskContext } from "../../../../../contexts/TaskProvider";
import { Task } from "../../../../../types/task";

export const useDeleteTask = (task: Task) => {
  const { deleteTask: deleteTaskInStore } = useTaskContext();

  const deleteTask = async () => {
    if (!task.id) {
      toast.error("Task id is required!");
      return;
    }
    const res = await deleteTaskApi(task.id);
    if (res.status === "error") {
      toast.error("Failed to delete task!");
      return;
    }
    deleteTaskInStore(task.id);
    toast.success("Task deleted successfully!");
  };

  return {
    deleteTask,
  };
};
