import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App.jsx";

describe("Todo List", () => {
  it("adds a task, clears the field, and announces the result", async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByRole("textbox", { name: "New task" });
    await user.type(input, "Prepare project notes");
    await user.click(screen.getByRole("button", { name: /add task/i }));

    expect(screen.getByText("Prepare project notes")).toBeInTheDocument();
    expect(input).toHaveValue("");
    expect(screen.getByRole("status")).toHaveTextContent(
      "Added: Prepare project notes",
    );
  });

  it("submits the form with Enter", async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByRole("textbox", { name: "New task" });
    await user.type(input, "Reply to Sam{enter}");

    expect(screen.getByText("Reply to Sam")).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  it("keeps whitespace-only input and does not create a task", async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByRole("textbox", { name: "New task" });
    await user.type(input, "   ");
    await user.click(screen.getByRole("button", { name: /add task/i }));

    expect(input).toHaveValue("   ");
    expect(screen.getByRole("list", { name: "Tasks" })).toBeEmptyDOMElement();
    expect(screen.getByRole("status")).toHaveTextContent(
      "Write a task before adding it.",
    );
  });

  it("renders user input as plain text instead of interpreting markup", async () => {
    const user = userEvent.setup();
    const markup = '<img src=x onerror="alert(1)">';
    const { container } = render(<App />);

    await user.type(screen.getByRole("textbox", { name: "New task" }), markup);
    await user.click(screen.getByRole("button", { name: /add task/i }));

    expect(screen.getByText(markup)).toBeInTheDocument();
    expect(container.querySelector("img")).not.toBeInTheDocument();
  });

  it("deletes a task when its delete button is clicked", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByRole("textbox", { name: "New task" }), "Buy tea");
    await user.click(screen.getByRole("button", { name: /add task/i }));
    await user.click(screen.getByRole("button", { name: "Delete task: Buy tea" }));

    expect(screen.queryByText("Buy tea")).not.toBeInTheDocument();
    expect(screen.getByText("A clear page is a good place to start.")).toBeInTheDocument();
  });

  it("toggles completion and filters tasks", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByRole("textbox", { name: "New task" }), "Stretch");
    await user.click(screen.getByRole("button", { name: /add task/i }));
    await user.click(screen.getByRole("button", { name: "Mark Stretch complete" }));

    await user.click(screen.getByRole("button", { name: "To do" }));
    const list = screen.getByRole("list", { name: "Tasks" });
    expect(within(list).queryByText("Stretch")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Completed" }));
    expect(within(list).getByText("Stretch")).toBeInTheDocument();
  });

  it("exposes pressed state for the selected filter", () => {
    render(<App />);
    expect(screen.getByRole("button", { name: /all tasks/i })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
  it("shows projects as selectable sidebar tabs", () => {
    render(<App />);

    const tablist = screen.getByRole("tablist", { name: "React projects" });
    const todoTab = within(tablist).getByRole("tab", { name: /Todo List/ });

    expect(todoTab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tabpanel", { name: /Todo List/ })).toBeInTheDocument();
  });

});
