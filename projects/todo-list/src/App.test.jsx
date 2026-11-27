import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App.jsx";

describe("Todo List project", () => {
  it("starts with the three example tasks", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "Todo List" })).toBeInTheDocument();
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(3);
    expect(within(items[0]).getByText("Walk the dog")).toBeInTheDocument();
    expect(within(items[1]).getByText("Water the plants")).toBeInTheDocument();
    expect(within(items[2]).getByText("Wash the dishes")).toBeInTheDocument();
  });

  it("adds a trimmed task and clears the input", async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByRole("textbox", { name: "Add your task" });
    await user.type(input, "  Prepare project notes  ");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(screen.getByText("Prepare project notes")).toBeInTheDocument();
    expect(input).toHaveValue("");
    expect(screen.getAllByRole("listitem")).toHaveLength(4);
  });

  it("does not add an empty task", async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByRole("textbox", { name: "Add your task" });
    await user.type(input, "   ");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(input).toHaveValue("   ");
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  it("renders markup-like input as plain text", async () => {
    const user = userEvent.setup();
    const markup = '<img src=x onerror="alert(1)">';
    const { container } = render(<App />);

    await user.type(screen.getByRole("textbox", { name: "Add your task" }), markup);
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(screen.getByText(markup)).toBeInTheDocument();
    expect(container.querySelector("img")).not.toBeInTheDocument();
  });

  it("deletes an existing task", async () => {
    const user = userEvent.setup();
    render(<App />);

    const dogTask = screen.getByText("Walk the dog").closest("li");
    await user.click(within(dogTask).getByRole("button", { name: "Delete" }));

    expect(screen.queryByText("Walk the dog")).not.toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});
