import { createContext, useContext, useEffect, useState } from "react";
import { FilterStatus, Task } from "../types/task";
import { getTasksApi } from "../api/task";
import { toast } from "react-toastify";

type ContextType = {
  tasks: Task[];
  filterStatus: FilterStatus;
  getTasks: () => void;
  setFilterStatus: (value: FilterStatus) => void;
  addTask: (task: Task) => void;
  updateTask: (id: number, task: Task) => void;
  deleteTask: (id: number) => void;
  isLoadingTasks: boolean;
}

const TaskContext = createContext<ContextType>({
  tasks: [],
  getTasks: () => { },
  filterStatus: "all",
  setFilterStatus: () => { },
  addTask: (_: Task) => { },
  updateTask: (_: number, __: Task) => { },
  deleteTask: (_: number) => { },
  isLoadingTasks: true,
});

const TaskContextProvider = (props: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [isLoadingTasks, setIsLoadingTasks] = useState<boolean>(true);

  const getTasks = async () => {
    setIsLoadingTasks(true);
    const res = await getTasksApi();
    setIsLoadingTasks(false);
    if (res.status === "success") {
      setTasks(res.result);
    } else {
      toast.error("Failed to fetch tasks");
    }
  };

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const updateTask = (id: number, task: Task) => {
    const newTasks = tasks.map((t) => {
      if (t.id === id) {
        return task;
      }
      return t;
    });
    setTasks(newTasks);
  };

  const deleteTask = (id: number) => {
    const newTasks = tasks.filter((t) => t.id !== id);
    setTasks(newTasks);
  };

  useEffect(() => {
    getTasks();
  }, []);

  return <TaskContext.Provider value={{ tasks, filterStatus, getTasks, setFilterStatus, addTask, updateTask, deleteTask, isLoadingTasks }}>
    {props.children}
  </TaskContext.Provider>;
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within TaskContextProvider");
  }
  return context;
};

export default TaskContextProvider;
