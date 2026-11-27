import { useMemo, useState } from "react";
import {
  addTask,
  getTaskCounts,
  getVisibleTasks,
  removeTask,
  toggleTask,
} from "./todoModel.js";

export default function TodoListProject() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [draft, setDraft] = useState("");
  const [message, setMessage] = useState("");

  const counts = useMemo(() => getTaskCounts(tasks), [tasks]);
  const visibleTasks = useMemo(
    () => getVisibleTasks(tasks, filter),
    [tasks, filter],
  );

  function handleSubmit(event) {
    event.preventDefault();
    const text = draft.trim();

    if (!text) {
      setMessage("Write a task before adding it.");
      return;
    }

    setTasks((currentTasks) => addTask(currentTasks, text));
    setDraft("");
    setMessage(`Added: ${text}`);
  }

  function handleDraftChange(event) {
    setDraft(event.target.value);
    if (message) setMessage("");
  }

  function handleDelete(task) {
    setTasks((currentTasks) => removeTask(currentTasks, task.id));
    setMessage(`Deleted: ${task.text}`);
  }

  function handleToggle(task) {
    setTasks((currentTasks) => toggleTask(currentTasks, task.id));
    setMessage(
      task.completed
        ? `Marked as to do: ${task.text}`
        : `Completed: ${task.text}`,
    );
  }

  const emptyTitle =
    tasks.length === 0
      ? "A clear page is a good place to start."
      : filter === "active"
        ? "Nothing left on your list."
        : "No completed tasks yet.";

  const emptyCopy =
    tasks.length === 0
      ? "Add one small thing you’d like to get done."
      : filter === "active"
        ? "You’ve made it through everything."
        : "Finished tasks will show up here.";

  return (
    <>
      <header className="topbar">
        <a className="brand" href="./" aria-label="Daymark home">
          <span className="brand-mark" aria-hidden="true">d</span>
          <span>daymark</span>
        </a>
        <span className="topbar-note"><span className="status-dot" /> A little progress, every day</span>
      </header>

      <section className="intro" aria-labelledby="page-title">
        <p className="eyebrow"><span>YOUR SPACE</span><span>01 / 01</span></p>
        <h1 id="page-title">Make room for<br /><em>what matters.</em></h1>
        <p className="intro-copy">A quieter kind of to-do list. Capture the next thing, then give it your attention.</p>
      </section>

      <section className="workspace" aria-label="Todo list">
        <div className="list-heading">
          <div>
            <p className="section-kicker">TODAY’S LIST</p>
            <h2>Your tasks <span className="heading-count">{counts.total}</span></h2>
          </div>
          <div className="progress-summary" aria-label={`${counts.completed} of ${counts.total} tasks completed`}>
            <span className="progress-label">{counts.remaining === 0 && counts.total > 0 ? "All caught up" : `${counts.remaining} to go`}</span>
            <span className="progress-track" aria-hidden="true"><span style={{ width: `${counts.total ? (counts.completed / counts.total) * 100 : 0}%` }} /></span>
          </div>
        </div>

        <form className="task-form" onSubmit={handleSubmit} noValidate>
          <label className="sr-only" htmlFor="task-input">New task</label>
          <span className="input-plus" aria-hidden="true">＋</span>
          <input
            id="task-input"
            name="task"
            type="text"
            value={draft}
            onChange={handleDraftChange}
            placeholder="What needs your attention?"
            maxLength={120}
            aria-describedby="task-hint"
            autoComplete="off"
          />
          <button className="add-button" type="submit"><span>Add task</span><span aria-hidden="true">↗</span></button>
        </form>
        <p id="task-hint" className="input-hint">Press Enter to add · 120 characters max</p>

        <div className="list-toolbar">
          <div className="filter-list" aria-label="Filter tasks">
            {[
              { id: "all", label: "All tasks" },
              { id: "active", label: "To do" },
              { id: "completed", label: "Completed" },
            ].map((item) => (
              <button
                className={`filter-button ${filter === item.id ? "is-selected" : ""}`}
                key={item.id}
                type="button"
                aria-pressed={filter === item.id}
                onClick={() => setFilter(item.id)}
              >
                {item.label}
                {item.id === "all" && <span className="filter-count">{counts.total}</span>}
              </button>
            ))}
          </div>
          <span className="list-caption">{counts.total === 1 ? "1 task" : `${counts.total} tasks`}</span>
        </div>

        <ul className="task-list" aria-label="Tasks">
          {visibleTasks.map((task, index) => (
            <li className={`task-row ${task.completed ? "is-complete" : ""}`} key={task.id}>
              <button
                className="task-check"
                type="button"
                aria-label={task.completed ? `Mark ${task.text} as to do` : `Mark ${task.text} complete`}
                aria-pressed={task.completed}
                onClick={() => handleToggle(task)}
              >
                {task.completed && <span aria-hidden="true">✓</span>}
              </button>
              <span className="task-index">{String(index + 1).padStart(2, "0")}</span>
              <span className="task-text">{task.text}</span>
              <button className="delete-button" type="button" aria-label={`Delete task: ${task.text}`} onClick={() => handleDelete(task)}>
                <span aria-hidden="true">×</span>
              </button>
            </li>
          ))}
        </ul>

        {visibleTasks.length === 0 && (
          <div className="empty-state">
            <span className="empty-icon" aria-hidden="true">{tasks.length === 0 ? "✳" : "✓"}</span>
            <h3>{emptyTitle}</h3>
            <p>{emptyCopy}</p>
          </div>
        )}

        <p className="sr-only" role="status" aria-live="polite">{message}</p>
      </section>

      <footer className="page-footer">
        <span><span className="footer-spark" aria-hidden="true">✳</span> Small steps count.</span>
        <span>Made for focus <span aria-hidden="true">·</span> Built with React</span>
      </footer>
    </>
  );
}
