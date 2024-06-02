export type StatusEnum = "todo" | "pending" | "completed";

export type Task = {
  id?: number;
  title: string;
  description?: string;
  status: StatusEnum,
  dueDate?: string | null;
}

export type Status = {
  value: StatusEnum;
  label: string;
}

export type FilterStatus = StatusEnum | "all";
