import { useState, useEffect } from "react";
import QuoteBox from "./components/QuoteBox";
import TaskItem from "./components/TaskItem";
import { Task } from "./types";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>(
    JSON.parse(localStorage.getItem("tasks") || "[]").map((task: Task) => ({
      ...task,
      createdAt: task.createdAt || new Date().toISOString(),
    }))
  );

  const [filter, setFilter] = useState("all");
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!title) return;
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
    setTitle("");
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks
    .filter(task =>
      filter === "all" ? true : filter === "completed" ? task.completed : !task.completed
    )
    .filter(task => task.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sortBy === "date"
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : a.title.localeCompare(b.title)
    );

  return (
    <div className="container">
      
      {/* תפריט עליון */}
      <nav className="navbar">
        <h1>מנהל משימות </h1>
        <div className="nav-links">
          <a href="#">משימות </a>
          <a href="#">ארכיון משימות </a>
        </div>
      </nav>

      {/* אזור הציטוט */}
      <div className="quote-container">
        <QuoteBox />
      </div>

      {/* חיפוש ומיון */}
      <div className="search-sort">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className="search-input"
        />
        <select className="sort-select" onChange={(e) => setSortBy(e.target.value)}>
          <option value="date">Sort by: Date</option>
          <option value="name">Sort by: Name</option>
        </select>
      </div>

      {/* אזור הוספת משימה */}
      <div className="task-input-container">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter new task..."
          className="task-input"
        />
        <button 
          onClick={addTask} 
          className="task-add-button">
          ➕ Add Task
        </button>
      </div>

      {/* כפתורי סינון */}
      <div className="filter-buttons">
        <button 
          onClick={() => setFilter("all")} 
          className={`filter-button ${filter === "all" ? "active" : ""}`}>
          📋 כל המשימות
        </button>
        <button 
          onClick={() => setFilter("completed")} 
          className={`filter-button ${filter === "completed" ? "active" : ""}`}>
        </button>
        <button 
          onClick={() => setFilter("incomplete")} 
          className={`filter-button ${filter === "incomplete" ? "active" : ""}`}>
          ⏳ משימות שלא הושלמו
        </button>
      </div>

      רשימת המשימות
      <div className="todo-list">
        <h2>{filter === "completed" ? "Completed Tasks" : filter === "incomplete" ? "Incomplete Tasks" : "All Tasks"}</h2>
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TaskItem
                    id={task.id}
                    taskTitle={task.title}
                    completed={task.completed}
                    onToggle={() => toggleTask(task.id)}
                    onDelete={() => deleteTask(task.id)} 
                  />


          ))
        ) : (
          <p className="empty-message">📭 No tasks available</p>
        )}
      </div>
    </div>
  );
};

export default App;
