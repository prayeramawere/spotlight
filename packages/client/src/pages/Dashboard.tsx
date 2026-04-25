import { useEffect, useState } from "react";
import type { Project, Task, TasksState, TaskStatus } from "../lib/types";
import { PROJECTS, TEAM } from "../lib/utils/data";
import { cn, getProgress } from "../lib/utils/helpers";
import { StatusBadge } from "../components/StatusBadge";
import { PriorityDot } from "../components/PriorityDot";

export interface DashboardProps {
  selectedProject: Project | null;
  setSelectedProject: (proj: Project | null) => void;
}

export function Dashboard({
  selectedProject,
  setSelectedProject,
}: DashboardProps) {
  const [activeClient, setActiveClient] = useState<Project>(
    selectedProject ?? PROJECTS[0],
  );
  const [newTaskName, setNewTaskName] = useState<string>("");
  const [tasks, setTasks] = useState<TasksState>(() => {
    const init: TasksState = {};
    PROJECTS.forEach((p) => {
      init[p.id] = [...p.tasks];
    });
    return init;
  });

  useEffect(() => {
    if (selectedProject) setActiveClient(selectedProject);
  }, [selectedProject]);

  const clientTasks: Task[] = tasks[activeClient.id] ?? [];
  const progress = getProgress(clientTasks);

  function cycleStatus(taskId: number): void {
    const cycle: Record<TaskStatus, TaskStatus> = {
      todo: "in-progress",
      "in-progress": "done",
      done: "todo",
    };
    setTasks((prev) => ({
      ...prev,
      [activeClient.id]: (prev[activeClient.id] ?? []).map((t) =>
        t.id === taskId ? { ...t, status: cycle[t.status] } : t,
      ),
    }));
  }

  function addTask(): void {
    if (!newTaskName.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      name: newTaskName.trim(),
      status: "todo",
      priority: "med",
      due: "TBD",
      assignee: TEAM[0],
    };
    setTasks((prev) => ({
      ...prev,
      [activeClient.id]: [...(prev[activeClient.id] ?? []), newTask],
    }));
    setNewTaskName("");
  }

  const allTasks: Task[] = Object.values(tasks).flat();
  const totalDone = allTasks.filter((t) => t.status === "done").length;
  const totalInProgress = allTasks.filter(
    (t) => t.status === "in-progress",
  ).length;
  const overallProgress = Math.round((totalDone / allTasks.length) * 100);

  return (
    <div className="min-h-screen bg-[#080C14] pt-16 flex">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 bg-[#080C14] flex flex-col fixed left-0 top-16 bottom-0 overflow-y-auto">
        <div className="p-6 border-b border-white/5">
          <p className="text-[10px] text-slate-600 font-bold tracking-[0.3em] uppercase mb-4">
            Clients
          </p>
          <div className="space-y-1">
            {PROJECTS.map((proj) => {
              const p = getProgress(tasks[proj.id] ?? []);
              const isActive = activeClient.id === proj.id;
              return (
                <button
                  key={proj.id}
                  onClick={() => {
                    setActiveClient(proj);
                    setSelectedProject(null);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-left",
                    isActive
                      ? "bg-white/8 border border-white/10"
                      : "hover:bg-white/4",
                  )}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0"
                    style={{ background: proj.color + "20", color: proj.color }}
                  >
                    {proj.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={cn(
                        "text-sm font-bold truncate",
                        isActive ? "text-white" : "text-slate-400",
                      )}
                    >
                      {proj.client}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1 bg-white/5 rounded-full">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${p}%`, background: proj.color }}
                        />
                      </div>
                      <span
                        className="text-[10px] font-bold"
                        style={{ color: proj.color }}
                      >
                        {p}%
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6 mt-auto">
          <p className="text-[10px] text-slate-600 font-bold tracking-[0.3em] uppercase mb-4">
            Overview
          </p>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-500">Total Tasks</span>
              <span className="text-sm font-bold text-white">
                {totalDone}/{allTasks.length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-500">In Progress</span>
              <span className="text-sm font-bold text-amber-400">
                {totalInProgress}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-500">Overall</span>
              <span className="text-sm font-bold text-[#00FF94]">
                {overallProgress}%
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-72 p-8">
        {/* Client Header */}
        <div className="mb-8 p-8 rounded-2xl bg-[#0A0F1C] border border-white/5 relative overflow-hidden">
          <div
            className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-30"
            style={{
              background: `radial-gradient(circle, ${activeClient.color}15 0%, transparent 70%)`,
              transform: "translate(30%, -30%)",
            }}
          />
          <div className="relative flex flex-col md:flex-row md:items-start gap-6">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center text-xl font-black flex-shrink-0"
              style={{
                background: activeClient.color + "20",
                color: activeClient.color,
                border: `1px solid ${activeClient.color}30`,
              }}
            >
              {activeClient.logo}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-start gap-4 justify-between">
                <div>
                  <p
                    className="text-xs font-bold tracking-widest uppercase mb-1"
                    style={{ color: activeClient.color }}
                  >
                    {activeClient.industry}
                  </p>
                  <h2 className="text-3xl font-black text-white">
                    {activeClient.client}
                  </h2>
                  <p className="text-slate-400 mt-1">{activeClient.project}</p>
                </div>
                <div className="flex gap-6">
                  {(
                    [
                      [activeClient.budget, "Budget"],
                      [activeClient.duration, "Duration"],
                    ] as [string, string][]
                  ).map(([val, label]) => (
                    <div key={label} className="text-right">
                      <p className="text-2xl font-black text-white">{val}</p>
                      <p className="text-xs text-slate-500 tracking-wider uppercase">
                        {label}
                      </p>
                    </div>
                  ))}
                  <div className="text-right">
                    <p
                      className="text-2xl font-black"
                      style={{ color: activeClient.color }}
                    >
                      {progress}%
                    </p>
                    <p className="text-xs text-slate-500 tracking-wider uppercase">
                      Complete
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-slate-400 text-sm mt-4 max-w-xl">
                {activeClient.desc}
              </p>
              <div className="mt-4 h-2 bg-white/5 rounded-full w-full max-w-sm">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${progress}%`,
                    background: activeClient.color,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {(
            [
              {
                label: "Total Tasks",
                value: clientTasks.length,
                color: "text-white",
              },
              {
                label: "Completed",
                value: clientTasks.filter((t) => t.status === "done").length,
                color: "text-emerald-400",
              },
              {
                label: "In Progress",
                value: clientTasks.filter((t) => t.status === "in-progress")
                  .length,
                color: "text-amber-400",
              },
              {
                label: "Pending",
                value: clientTasks.filter((t) => t.status === "todo").length,
                color: "text-slate-400",
              },
            ] as { label: string; value: number; color: string }[]
          ).map(({ label, value, color }) => (
            <div
              key={label}
              className="bg-[#0A0F1C] border border-white/5 rounded-xl p-5"
            >
              <p className={cn("text-3xl font-black mb-1", color)}>{value}</p>
              <p className="text-xs text-slate-500 tracking-widest uppercase">
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Tasks Table */}
        <div className="bg-[#0A0F1C] border border-white/5 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h3 className="font-black text-white text-lg">Task Tracker</h3>
            <div className="flex gap-2">
              <input
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                placeholder="Add new task..."
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#00FF94]/50 w-56"
              />
              <button
                onClick={addTask}
                className="bg-[#00FF94] text-[#080C14] font-bold text-sm px-4 py-2 rounded-lg hover:bg-white transition-colors"
              >
                + Add
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  {[
                    "Task",
                    "Status",
                    "Priority",
                    "Assignee",
                    "Due",
                    "Action",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-6 py-3 text-[10px] font-bold tracking-widest uppercase text-slate-600"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {clientTasks.map((task) => (
                  <tr
                    key={task.id}
                    className="border-b border-white/5 hover:bg-white/3 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "text-sm font-medium",
                          task.status === "done"
                            ? "line-through text-slate-600"
                            : "text-white",
                        )}
                      >
                        {task.name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={task.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <PriorityDot priority={task.priority} />
                        <span className="text-xs text-slate-500 capitalize">
                          {task.priority}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-slate-300">
                        {task.assignee
                          .split(".")
                          .map((s) => s[0])
                          .join("")}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">
                      {task.due}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => cycleStatus(task.id)}
                        className="text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded border border-white/10 text-slate-400 hover:border-[#00FF94]/50 hover:text-[#00FF94] transition-all"
                      >
                        Advance
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
