
import "./Stats.css";

function Stats({ tasks }) {
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "To do"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completionPercentage =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="stats-container">
      <div className="stat-card">
        <h3>Total Tasks</h3>
        <h2>{totalTasks}</h2>
        <p>All tasks</p>
      </div>

      <div className="stat-card">
        <h3>Completed</h3>
        <h2>{completedTasks}</h2>
        <p>Finished tasks</p>
      </div>

      <div className="stat-card">
        <h3>Pending</h3>
        <h2>{pendingTasks}</h2>
        <p>To-do tasks</p>
      </div>

      <div className="stat-card">
        <h3>In Progress</h3>
        <h2>{inProgressTasks}</h2>
        <p>Active tasks</p>
      </div>

      <div className="stat-card completion-card">
        <h3>Completion Rate</h3>
        <h2>{completionPercentage}%</h2>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>

        <p>Overall progress</p>
      </div>
    </div>
  );
}

export default Stats;
