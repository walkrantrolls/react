import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Tabs from "./tabs";

const ITEMS = [
  { value: "html", label: "HTML", panel: <p>HTML panel content</p> },
  { value: "css", label: "CSS", panel: <p>CSS panel content</p> },
  { value: "js", label: "Javascript", panel: <p>JavaScript panel content</p> },
];

describe("Tabs", () => {
  it("selects the first item by default and displays its panel", () => {
    render(<Tabs items={ITEMS} />);

    expect(screen.getByRole("button", { name: "HTML" })).toHaveClass(
      "tabs-list-item--active",
    );
    expect(screen.getByText("HTML panel content").parentElement).not.toHaveAttribute("hidden");
    expect(screen.getByText("CSS panel content").parentElement).toHaveAttribute("hidden");
  });

  it("supports a default selected value", () => {
    render(<Tabs items={ITEMS} defaultValue="css" />);

    expect(screen.getByRole("button", { name: "CSS" })).toHaveClass(
      "tabs-list-item--active",
    );
    expect(screen.getByText("CSS panel content").parentElement).not.toHaveAttribute("hidden");
    expect(screen.getByText("HTML panel content").parentElement).toHaveAttribute("hidden");
  });

  it("changes the selected button and visible panel when clicked", async () => {
    const user = userEvent.setup();
    render(<Tabs items={ITEMS} />);

    await user.click(screen.getByRole("button", { name: "Javascript" }));

    expect(screen.getByRole("button", { name: "Javascript" })).toHaveClass(
      "tabs-list-item--active",
    );
    expect(screen.getByText("JavaScript panel content").parentElement).not.toHaveAttribute("hidden");
    expect(screen.getByText("HTML panel content").parentElement).toHaveAttribute("hidden");
  });
});
