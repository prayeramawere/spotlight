export type TaskStatus = "done" | "in-progress" | "todo";
export type Priority = "high" | "med" | "low";
export type ProjectStatus = "completed" | "active";
export type Page = "home" | "dashboard" | "stats" | "contact";

export interface Task {
  id: number;
  name: string;
  status: TaskStatus;
  priority: Priority;
  due: string;
  assignee: string;
}

export interface Project {
  id: number;
  client: string;
  industry: string;
  logo: string;
  color: string;
  project: string;
  year: string;
  status: ProjectStatus;
  tags: string[];
  desc: string;
  budget: string;
  duration: string;
  tasks: Task[];
}

export interface TasksState {
  [projectId: number]: Task[];
}
