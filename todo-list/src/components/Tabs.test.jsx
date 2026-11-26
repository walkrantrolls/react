import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Tabs from "./Tabs.jsx";

const ITEMS = [
  { value: "one", label: "First", panel: <p>First panel content</p> },
  { value: "two", label: "Second", panel: <p>Second panel content</p> },
  { value: "three", label: "Third", panel: <p>Third panel content</p> },
];

describe("Tabs", () => {
  it("renders every tab and selects the first by default", () => {
    render(<Tabs items={ITEMS} ariaLabel="Test tabs" />);

    const tablist = screen.getByRole("tablist", { name: "Test tabs" });
    expect(within(tablist).getAllByRole("tab")).toHaveLength(3);
    expect(within(tablist).getByRole("tab", { name: "First" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tabpanel")).toHaveTextContent("First panel content");
    expect(screen.queryByText("Second panel content")).not.toBeVisible();
  });

  it("supports an initial active tab", () => {
    render(<Tabs items={ITEMS} defaultValue="two" ariaLabel="Test tabs" />);

    expect(screen.getByRole("tab", { name: "Second" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Second panel content");
  });

  it("falls back to the first tab when defaultValue is invalid", () => {
    render(<Tabs items={ITEMS} defaultValue="missing" ariaLabel="Test tabs" />);

    expect(screen.getByRole("tab", { name: "First" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tabpanel")).toHaveTextContent("First panel content");
  });

  it("switches the visible panel when a tab is clicked", async () => {
    const user = userEvent.setup();
    render(<Tabs items={ITEMS} ariaLabel="Test tabs" />);

    await user.click(screen.getByRole("tab", { name: "Third" }));

    expect(screen.getByRole("tab", { name: "Third" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Third panel content");
    expect(screen.queryByText("First panel content")).not.toBeVisible();
  });

  it("keeps separate instances independent", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Tabs items={ITEMS} ariaLabel="First group" />
        <Tabs items={ITEMS} defaultValue="two" ariaLabel="Second group" />
      </>,
    );

    const firstGroup = screen.getByRole("tablist", { name: "First group" });
    const secondGroup = screen.getByRole("tablist", { name: "Second group" });

    expect(within(firstGroup).getByRole("tab", { name: "First" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(within(secondGroup).getByRole("tab", { name: "Second" })).toHaveAttribute(
      "aria-selected",
      "true",
    );

    await user.click(within(firstGroup).getByRole("tab", { name: "Third" }));

    expect(within(firstGroup).getByRole("tab", { name: "Third" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(within(secondGroup).getByRole("tab", { name: "Second" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getAllByRole("tabpanel")).toHaveLength(2);
  });

  it("supports arrow, Home, and End keyboard navigation", async () => {
    const user = userEvent.setup();
    render(<Tabs items={ITEMS} ariaLabel="Test tabs" />);

    const firstTab = screen.getByRole("tab", { name: "First" });
    firstTab.focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Second" })).toHaveFocus();

    await user.keyboard("{End}");
    expect(screen.getByRole("tab", { name: "Third" })).toHaveFocus();

    await user.keyboard("{Home}");
    expect(firstTab).toHaveFocus();
  });

  it("renders nothing for an empty item list", () => {
    const { container } = render(
      <Tabs items={[]} ariaLabel="Empty tabs" />,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
