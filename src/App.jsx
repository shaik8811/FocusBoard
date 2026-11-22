import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Stats from "./components/Stats";
import TaskList from "./components/TaskList";
import CreateTask from "./components/CreateTask";
import FocusNotes from "./components/FocusNotes";
import initialTasks from "./data/tasks";
import "./App.css";

const STORAGE_KEY = "focusboard-tasks";
function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return initialTasks;
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : initialTasks;
  } catch { return initialTasks; }
}
export default function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [editingTask, setEditingTask] = useState(null);
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); }
    catch (error) { console.warn("Could not save tasks", error); }
  }, [tasks]);
  const saveTask = (task) => {
    if (editingTask) {
      setTasks(previous => previous.map(item => item.id === editingTask.id ? { ...task, id: item.id } : item));
      setEditingTask(null);
    } else setTasks(previous => [...previous, { ...task, id: crypto.randomUUID ? crypto.randomUUID() : Date.now() }]);
  };
  const deleteTask = id => {
    if (window.confirm("Delete this task? This cannot be undone.")) {
      setTasks(previous => previous.filter(task => task.id !== id));
      if (editingTask?.id === id) setEditingTask(null);
    }
  };
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.trim().toLowerCase()) &&
    (statusFilter === "All" || task.status === statusFilter) &&
    (priorityFilter === "All" || task.priority === priorityFilter)
  );
  return <div className="app-layout">
    <Sidebar onNavigate={(section) => {
      if (section === "important") { setPriorityFilter("High"); document.getElementById("tasks")?.scrollIntoView({behavior:"smooth"}); }
      else { if (section === "dashboard") { setPriorityFilter("All"); setStatusFilter("All"); } document.getElementById(section === "tasks" ? "tasks" : "dashboard")?.scrollIntoView({behavior:"smooth"}); }
    }} />
    <main id="dashboard" className="main-content">
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <Stats tasks={tasks} />
      <CreateTask onSaveTask={saveTask} editingTask={editingTask} onCancel={() => setEditingTask(null)} />
      <TaskList tasks={filteredTasks} statusFilter={statusFilter} setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter} setPriorityFilter={setPriorityFilter}
        onDelete={deleteTask} onEdit={task => { setEditingTask(task); document.getElementById("task-form")?.scrollIntoView({behavior:"smooth"}); }}
        onStatusChange={(id,status) => setTasks(previous => previous.map(task => task.id === id ? {...task,status} : task))} />
      <FocusNotes />
    </main>
  </div>;
}
