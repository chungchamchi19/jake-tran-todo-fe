import { BASE_URL } from "../configs/api";
import { Task } from "../types/task";

async function api<T, B>(url: string, options?: {method: "GET" | "POST" | "PUT" | "DELETE" , body?: B} ): Promise<T> {
  const method = options?.method || "GET";
  const body = options?.body;
  return fetch(BASE_URL + url, {method, body: JSON.stringify(body), headers: { "Content-Type": "application/json" }})
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<T>;
    })
    .catch(error => {
      throw error;
    });
}

type Response<R> = {
  status: "success" | "error";
  result: R;
}

export const createTaskApi = async (taskBody: Task) => {
  const task = await api<Response<Task>, Task>("/tasks", {method: "POST", body: taskBody});
  return task;
};

export const updateTaskApi = async (id: number, task: Task) => {
  const updatedTasks = await api<Response<Task>, Task>(`/tasks/${id}`, {method: "PUT", body: task});
  return updatedTasks;
};

export const deleteTaskApi = (id: number) => {
  const deletedTask = api<Response<Task>, never>(`/tasks/${id}`, {method: "DELETE"});
  return deletedTask;
};

export const getTasksApi = async () => {
  return await api<Response<Task[]>, never>("/tasks");
};