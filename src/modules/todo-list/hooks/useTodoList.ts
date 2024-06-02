import { useCallback, useEffect, useState } from "react";
import { useTaskContext } from "../../../contexts/TaskProvider";
import { StatusEnum, Task } from "../../../types/task";
import { listStatus } from "../../../configs/status";

type TaskGroup = {
  status: StatusEnum;
  tasks: Task[];
};

export const useTodoList = () => {
  const { tasks, filterStatus } = useTaskContext();
  const [taskGroups, setTaskGroups] = useState<TaskGroup[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);
  const [showModalDelete, setShowModalDelete] = useState<boolean>(false);

  const onEditTask = (task: Task) => {
    setEditingTask(task);
    setShowModalEdit(true);
  };

  const onDeleteTask = (task: Task) => {
    setDeletingTask(task);
    setShowModalDelete(true);
  };

  const filterTasksByStatus = useCallback(() => {
    if (filterStatus === "all") {
      return tasks;
    }
    return tasks.filter((task) => task.status === filterStatus);
  }, [tasks, filterStatus]);

  const groupTaskByStatus = useCallback(() => {
    const dividedTaskGroups: TaskGroup[] = [];
    const filteredTasks = filterTasksByStatus();
    filteredTasks.forEach((task) => {
      const foundGroup = dividedTaskGroups.find((group) => group.status === task.status);
      if (foundGroup) {
        foundGroup.tasks.push(task);
        return;
      }
      const newGroup: TaskGroup = {
        status: task.status,
        tasks: [task]
      };
      dividedTaskGroups.push(newGroup);
    });
    setTaskGroups(sortGroups(dividedTaskGroups));
  }, [filterTasksByStatus]);

  const sortGroups = (groups: TaskGroup[]) => {
    const order: Map<StatusEnum, number> = new Map([
      ["todo", 1],
      ["pending", 2],
      ["completed", 3]
    ]);
    return groups.sort((a, b) => (order.get(a.status) ?? 0) - (order.get(b.status) ?? 0));
  };

  const getStatusLabel = (status: StatusEnum) => {
    return listStatus.find((item) => item.value === status)?.label ?? status;
  };

  useEffect(() => {
    groupTaskByStatus();
  }, [tasks, groupTaskByStatus, filterStatus]);

  return {
    taskGroups,
    onEditTask,
    onDeleteTask,
    editingTask,
    showModalEdit,
    setShowModalEdit,
    deletingTask,
    showModalDelete,
    setShowModalDelete,
    getStatusLabel,
  };
};
