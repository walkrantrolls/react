import { describe, expect, it } from "vitest";
import {
  addTask,
  createTask,
  getTaskCounts,
  getVisibleTasks,
  removeTask,
  toggleTask,
} from "./todoModel.js";

const tasks = [
  { id: "a", text: "Plan the week", completed: false },
  { id: "b", text: "Send the invoice", completed: true },
];

describe("createTask", () => {
  it("trims surrounding whitespace and creates an active task", () => {
    expect(createTask("  Buy groceries  ", "task-1")).toEqual({
      id: "task-1",
      text: "Buy groceries",
      completed: false,
    });
  });

  it("returns null for empty or whitespace-only input", () => {
    expect(createTask("   ", "task-1")).toBeNull();
  });
});

describe("task collection operations", () => {
  it("adds a task without mutating the original array", () => {
    const result = addTask(tasks, "Book a dentist appointment");

    expect(result).toHaveLength(3);
    expect(result[2]).toMatchObject({
      text: "Book a dentist appointment",
      completed: false,
    });
    expect(tasks).toHaveLength(2);
  });

  it("does not add a blank task", () => {
    expect(addTask(tasks, "  ")).toBe(tasks);
  });

  it("toggles only the matching task", () => {
    expect(toggleTask(tasks, "a")).toEqual([
      { ...tasks[0], completed: true },
      tasks[1],
    ]);
    expect(tasks[0].completed).toBe(false);
  });

  it("deletes the matching task and preserves the others", () => {
    expect(removeTask(tasks, "a")).toEqual([tasks[1]]);
    expect(tasks).toHaveLength(2);
  });

  it("filters all, active, and completed tasks", () => {
    expect(getVisibleTasks(tasks, "all")).toEqual(tasks);
    expect(getVisibleTasks(tasks, "active")).toEqual([tasks[0]]);
    expect(getVisibleTasks(tasks, "completed")).toEqual([tasks[1]]);
  });

  it("calculates total, completed, and remaining counts", () => {
    expect(getTaskCounts(tasks)).toEqual({
      total: 2,
      completed: 1,
      remaining: 1,
    });
  });

  it("returns zero counts for an empty list", () => {
    expect(getTaskCounts([])).toEqual({
      total: 0,
      completed: 0,
      remaining: 0,
    });
  });
});
