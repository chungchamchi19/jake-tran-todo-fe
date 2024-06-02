import { Status } from "../types/task";

export const listStatus: Status[] = [
  {
    value: "todo",
    label: "To Do",
  },
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "completed",
    label: "Completed",
  },
];

export const statusColorCSS = {
  "todo": "bg-gray-500",
  "pending": "bg-yellow-500",
  "completed": "bg-green-500",
};
