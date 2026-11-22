import { useEffect, useState } from "react";
import "./CreateTask.css";
const emptyTask = { title:"", description:"", category:"Development", status:"To do", priority:"Medium", dueDate:"" };
export default function CreateTask({ onSaveTask, editingTask, onCancel }) {
  const [form, setForm] = useState(emptyTask);
  const [error, setError] = useState("");
  useEffect(() => {
    setForm(editingTask ? { ...emptyTask, ...editingTask } : emptyTask);
    setError("");
  }, [editingTask]);
  const change = event => { setForm(previous => ({...previous, [event.target.name]:event.target.value})); if(event.target.name === "title") setError(""); };
  const cancel = () => { setForm(emptyTask); setError(""); onCancel(); };
  const submit = event => {
    event.preventDefault();
    if (!form.title.trim()) { setError("Please enter a task title."); document.getElementById("task-title")?.focus(); return; }
    onSaveTask({...form, title:form.title.trim(), description:form.description.trim()});
    setForm(emptyTask); setError("");
  };
  return <section id="task-form" className="create-task" aria-labelledby="form-heading">
    <h2 id="form-heading">{editingTask ? "Edit Task" : "Create New Task"}</h2>
    <form onSubmit={submit} noValidate>
      <label htmlFor="task-title">Task Title <span aria-hidden="true">*</span></label>
      <input id="task-title" name="title" value={form.title} onChange={change} placeholder="Enter task title" aria-invalid={!!error} aria-describedby={error ? "title-error" : undefined} />
      {error && <p id="title-error" role="alert" className="form-error">{error}</p>}
      <label htmlFor="task-description">Description</label>
      <textarea id="task-description" name="description" value={form.description} onChange={change} placeholder="Enter task description" />
      <div className="form-grid">
        <div><label htmlFor="task-category">Category</label><select id="task-category" name="category" value={form.category} onChange={change}>{["Development","Learning","Career","Personal"].map(x=><option key={x}>{x}</option>)}</select></div>
        <div><label htmlFor="task-status">Status</label><select id="task-status" name="status" value={form.status} onChange={change}>{["To do","In Progress","Completed"].map(x=><option key={x}>{x}</option>)}</select></div>
        <div><label htmlFor="task-priority">Priority</label><select id="task-priority" name="priority" value={form.priority} onChange={change}>{["Low","Medium","High"].map(x=><option key={x}>{x}</option>)}</select></div>
        <div><label htmlFor="task-date">Due Date</label><input id="task-date" type="date" name="dueDate" value={form.dueDate} onChange={change}/></div>
      </div>
      <div className="form-actions"><button type="submit">{editingTask ? "Save Changes" : "Create Task"}</button><button type="button" className="secondary-button" onClick={cancel}>Cancel</button></div>
    </form>
  </section>;
}
