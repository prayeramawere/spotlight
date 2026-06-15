import { useState, useEffect } from "react";
import type { Client, Project, Task, TeamMember } from "../lib/types";
import { API_URL } from "../lib/utils/api";
import { getProgress } from "../lib/utils/helpers";

export function StatsPage() {
  const [activeClient, setActiveClient] = useState<Project>();
  const [PROJECTS, setProjects] = useState<Project[]>([]);
  const [newTaskName, setNewTaskName] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [TEAM, setTeam] = useState<TeamMember[]>([]);
  const [clients, setClients] = useState<Client[]>([]);

  type Links = {
    link1: string;
    link2: string;
    link3: string;
    link4: string;
  };

  const loadData = async (Links: Links) => {
    const { link1, link2, link3, link4 } = Links;
    const [projectsRes, tasksRes, teamRes, clientsRes] = await Promise.all([
      fetch(link1),
      fetch(link2),
      fetch(link3),
      fetch(link4),
    ]);

    const [projectsData, tasksData, teamData, clientsData] = await Promise.all([
      projectsRes.json(),
      tasksRes.json(),
      teamRes.json(),
      clientsRes.json(),
    ]);
    const projectData: Project[] = projectsData.data;
    const TASKS: Task[] = tasksData.data;
    const team: TeamMember[] = teamData.data;
    const clients: Client[] = clientsData.data;

    setActiveClient(projectData[0]);
    setProjects(projectData);
    setTasks(TASKS);
    setTeam(team);
    setClients(clients);
  };

  useEffect(() => {
    loadData({
      link1: `${API_URL}/projects`,
      link2: `${API_URL}/tasks`,
      link3: `${API_URL}/team`,
      link4: `${API_URL}/clients`,
    });
  }, []);

  const getProjectClient = (projectId: string): Client | undefined => {
    const project = PROJECTS.find((p) => p.id === projectId);
    if (!project) return undefined;
    return clients.find((c) => c.id === project.client_id);
  };

  const allTasks: Task[] = tasks;
  const done = allTasks.filter((t) => t.status === "done").length;
  const inProg = allTasks.filter((t) => t.status === "in-progress").length;
  const todo = allTasks.filter((t) => t.status === "todo").length;

  return (
    <div className="min-h-screen bg-[#080C14] pt-24 px-6 pb-16 max-w-7xl mx-auto">
      <div className="mb-12">
        <p className="text-[#00FF94] text-xs font-bold tracking-[0.3em] uppercase mb-3">
          Analytics
        </p>
        <h2 className="text-5xl font-black text-white tracking-tight">
          Overall Statistics
        </h2>
      </div>

      {/* Big stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {(
          [
            {
              label: "Total Revenue",
              value: "$707K",
              sub: "Managed",
              color: "#00FF94",
            },
            {
              label: "Total Projects",
              value: "5",
              sub: "Across industries",
              color: "#38BDF8",
            },
            {
              label: "Tasks Completed",
              value: `${done}`,
              sub: `of ${allTasks.length} total`,
              color: "#A78BFA",
            },
            {
              label: "Avg Completion",
              value: `${Math.round((done / allTasks.length) * 100)}%`,
              sub: "On track",
              color: "#FCD34D",
            },
          ] as { label: string; value: string; sub: string; color: string }[]
        ).map(({ label, value, sub, color }) => (
          <div
            key={label}
            className="bg-[#0A0F1C] border border-white/5 rounded-2xl p-7 relative overflow-hidden"
          >
            <div
              className="absolute bottom-0 right-0 w-24 h-24 rounded-full"
              style={{
                background: `radial-gradient(circle, ${color}10 0%, transparent 70%)`,
                transform: "translate(30%, 30%)",
              }}
            />
            <p className="text-xs text-slate-500 tracking-widest uppercase mb-3">
              {label}
            </p>
            <p className="text-4xl font-black mb-1" style={{ color }}>
              {value}
            </p>
            <p className="text-xs text-slate-600">{sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Task breakdown */}
        <div className="bg-[#0A0F1C] border border-white/5 rounded-2xl p-7">
          <h3 className="font-black text-white mb-6">Task Breakdown</h3>
          <div className="space-y-4">
            {(
              [
                { label: "Completed", count: done, color: "#00FF94" },
                { label: "In Progress", count: inProg, color: "#FCD34D" },
                { label: "To Do", count: todo, color: "#475569" },
              ] as { label: string; count: number; color: string }[]
            ).map(({ label, count, color }) => (
              <div key={label}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400 font-medium">{label}</span>
                  <span className="font-bold" style={{ color }}>
                    {count}{" "}
                    <span className="text-slate-600 font-normal">
                      / {allTasks.length}
                    </span>
                  </span>
                </div>
                <div className="h-2 bg-white/5 rounded-full">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${(count / allTasks.length) * 100}%`,
                      background: color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Per-client progress */}
        <div className="bg-[#0A0F1C] border border-white/5 rounded-2xl p-7">
          <h3 className="font-black text-white mb-6">Client Progress</h3>
          <div className="space-y-4">
            {PROJECTS.map((proj) => {
              const p = getProgress(
                tasks.filter((t) => t.project_id === proj.id),
              );
              return (
                <div key={proj.id} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded flex items-center justify-center text-[10px] font-black flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400 font-medium">
                        {getProjectClient(proj.id)?.name || "Unknown Client"}
                      </span>
                      <span className="font-bold">{p}%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${p}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Industry breakdown */}
      <div className="bg-[#0A0F1C] border border-white/5 rounded-2xl p-7">
        <h3 className="font-black text-white mb-6">Portfolio by Industry</h3>
        <div className="flex flex-wrap gap-4">
          {PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/5"
            >
              <div className="w-2 h-2 rounded-full" />
              <span className="text-sm text-slate-300 font-medium"></span>
              <span className="text-xs text-slate-600">· {proj.budget}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
