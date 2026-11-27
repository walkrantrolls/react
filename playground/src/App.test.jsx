import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App.jsx";

describe("React project playground", () => {
  it("shows Todo List as the initial project", () => {
    render(<App />);

    const tablist = screen.getByRole("tablist", { name: "React projects" });
    expect(within(tablist).getByRole("tab", { name: /Todo List/ })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("textbox", { name: "Add your task" })).toBeInTheDocument();
    expect(screen.getByText("Walk the dog")).toBeInTheDocument();
  });

  it("opens the Tabs project from the project sidebar", async () => {
    const user = userEvent.setup();
    render(<App />);

    const tablist = screen.getByRole("tablist", { name: "React projects" });
    await user.click(within(tablist).getByRole("tab", { name: /Tabs/ }));

    expect(screen.getByTitle("Tabs component demo")).toHaveAttribute(
      "src",
      expect.stringMatching(/\/tabs-demo\.html$/),
    );
  });
});
