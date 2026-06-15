export type TaskStatus = "done" | "in-progress" | "todo";
export type Priority = "high" | "med" | "low";
export type ProjectStatus = "completed" | "active";
export type Page = "home" | "dashboard" | "stats" | "contact";

export interface Task {
  id?:string;
  title: string;
  description: string;
  status: TaskStatus;
  project_id: string;
  created_at: string;
  assignedTo: string;
  priority: Priority;
  dueDate: string;
}

export interface Client {
  id: string;
  name: string;
  email:string;
  companyName: string;
  contactPerson:string;
  phone:string;
  industry:string;
  address:string;
  notes:string;

}

export interface TeamMember{
  id:string;
  name:string;
  email:string;
  role:string;
  hourlyRate:number;
}
export interface Invoice{
  id:string;
  clientId:string;
  projectId:string;
  amount:number;
  status:string;
  InvoiceNumber:string;
  dueDate:string;
  pdfURL:string;
}

export interface Project {
  id: string;
  client_id: string;
  name: string;
  budget: string;
  status: ProjectStatus;
  startDate: string;
  dueDate: string;
  progress: number;
  createdAt: string;
}

export interface TasksState {
  [projectId: string]: Task[];
}
