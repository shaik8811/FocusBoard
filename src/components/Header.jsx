
import "./Header.css";

function Header({ searchTerm, onSearchChange }) {
  return (
    <div className="header">
      <div>
        <h1>Dashboard</h1>
        <p>Welcome back! Here's your productivity overview.</p>
      </div>

      <div className="header-right">
        <label htmlFor="task-search" className="sr-only">
  Search tasks
</label>

<input
  id="task-search"
  type="text"
  placeholder="Search tasks..."
  value={searchTerm}
  onChange={(event) => onSearchChange(event.target.value)}
/>
        
        

        <span>👤 Rubeena</span>
      </div>
    </div>
  );
}

export default Header;
