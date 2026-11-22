import "./TaskList.css";
export default function TaskList({ tasks, statusFilter, setStatusFilter, priorityFilter, setPriorityFilter, onDelete, onEdit, onStatusChange }) {
  return <section id="tasks" className="task-list" aria-labelledby="tasks-heading">
    <div className="task-list-header"><h2 id="tasks-heading">My Tasks</h2><div><label className="sr-only" htmlFor="priority-filter">Filter by priority</label><select id="priority-filter" value={priorityFilter} onChange={e=>setPriorityFilter(e.target.value)}>{["All","High","Medium","Low"].map(x=><option value={x} key={x}>{x === "All" ? "All Priorities" : `${x} Priority`}</option>)}</select></div></div>
    <div className="status-tabs" role="group" aria-label="Filter tasks by status">{["All","To do","In Progress","Completed"].map(status=><button type="button" key={status} aria-pressed={statusFilter===status} className={statusFilter===status?"active-tab":""} onClick={()=>setStatusFilter(status)}>{status}</button>)}</div>
    {tasks.length === 0 ? <p className="empty-state">No tasks match your search or filters.</p> : tasks.map(task=><article className="task-card" key={task.id}>
      <div className="task-card-top"><h3>{task.title}</h3><span className={`priority-badge priority-${task.priority.toLowerCase()}`}>{task.priority}</span></div>
      <p>{task.description || "No description"}</p>
      <div className="task-meta"><span>Category: {task.category}</span><span>Due: {task.dueDate || "Not set"}</span></div>
      <div className="task-card-bottom"><div><label htmlFor={`status-${task.id}`}>Status: </label><select id={`status-${task.id}`} value={task.status} onChange={e=>onStatusChange(task.id,e.target.value)}>{["To do","In Progress","Completed"].map(x=><option key={x}>{x}</option>)}</select></div><div className="task-actions"><button type="button" onClick={()=>onEdit(task)}>Edit</button><button type="button" onClick={()=>onDelete(task.id)}>Delete</button></div></div>
    </article>)}
  </section>;
}
