let fallbackId = 0;

function createTaskId() {
  if (typeof globalThis.crypto?.randomUUID === "function") {
    return globalThis.crypto.randomUUID();
  }

  fallbackId += 1;
  return `task-${Date.now()}-${fallbackId}`;
}

export function createTask(value, id = createTaskId()) {
  const text = value.trim();

  if (!text) return null;

  return { id, text, completed: false };
}

export function addTask(tasks, value) {
  const task = createTask(value);

  return task ? [...tasks, task] : tasks;
}

export function toggleTask(tasks, id) {
  return tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task,
  );
}

export function removeTask(tasks, id) {
  return tasks.filter((task) => task.id !== id);
}

export function getVisibleTasks(tasks, filter) {
  if (filter === "active") return tasks.filter((task) => !task.completed);
  if (filter === "completed") return tasks.filter((task) => task.completed);
  return tasks;
}

export function getTaskCounts(tasks) {
  const completed = tasks.reduce(
    (count, task) => count + Number(task.completed),
    0,
  );

  return {
    total: tasks.length,
    completed,
    remaining: tasks.length - completed,
  };
}
