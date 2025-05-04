import React, { useState } from "react";
import { db } from "../services/firebase.config";
import { doc, runTransaction, updateDoc } from "firebase/firestore";

interface TaskItemProps {
  id: number;
  taskTitle: string;
  completed: boolean;
  timestamp?: { seconds: number };
  priority: number;
  archived: boolean;
  onToggle: () => void; 
  updateTask: (task: Partial<TaskItemProps>) => void;
  deleteTask: (id: number) => Promise<void>;
}

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  taskTitle,
  completed,
  timestamp,
  priority,
  archived,
  onToggle,
  updateTask,
  deleteTask
}) => {
  const [isChecked, setIsChecked] = useState(completed);

  const checkBoxHandler = () => {
    setIsChecked(!isChecked); // ✅ עדכון מיידי ל-UI
    onToggle();
  };

  const archiveTask = async () => {
    try {
      const docRef = doc(db, "tasks", id.toString());
      await updateDoc(docRef, { archived: true });
      updateTask({ id, archived: true });
      console.log("Task archived in Firestore:", id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;
    await deleteTask(id);
  };

  return (
    <div className="todo-list">
      <div className="todo-item">
        <hr />
        <div className="todo-content">
          <div className="checker-container">
            <div className="checker">
              <span>
                <input
                  type="checkbox"
                  checked={isChecked} // ✅ מתעדכן מקומית
                  onChange={checkBoxHandler}
                  name={id.toString()}
                />
              </span>
            </div>
          </div>
          <div className="task-details">
            <span className={completed ? "done" : ""}>
              {taskTitle} <br />
              <i>
                {timestamp?.seconds
                  ? new Date(timestamp.seconds * 1000).toLocaleString("en-GB")
                  : "No timestamp"}
              </i>
              <br />
              <span className="task-priority">Priority: {priority}</span>
            </span>
          </div>
          <span className="task-actions float-end mx-3">
            {completed && !archived && (
              <button className="btn btn-warning mx-2" onClick={archiveTask}>
                Archive
              </button>
            )}
            <button
              type="button"
              className="btn btn-danger float-end"
              onClick={handleDelete}
            >
              Delete
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
