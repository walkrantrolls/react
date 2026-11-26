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
  it("renders every item and selects the first item by default", () => {
    render(<Tabs items={ITEMS} />);

    expect(screen.getByRole("button", { name: "First" })).toHaveClass("is-selected");
    expect(screen.getByText("First panel content")).toBeVisible();
    expect(screen.getByText("Second panel content")).not.toBeVisible();
  });

  it("supports an initial active value", () => {
    render(<Tabs items={ITEMS} defaultValue="two" />);

    expect(screen.getByRole("button", { name: "Second" })).toHaveClass("is-selected");
    expect(screen.getByText("Second panel content")).toBeVisible();
    expect(screen.getByText("First panel content")).not.toBeVisible();
  });

  it("switches the active tab and visible panel when clicked", async () => {
    const user = userEvent.setup();
    render(<Tabs items={ITEMS} />);

    await user.click(screen.getByRole("button", { name: "Third" }));

    expect(screen.getByRole("button", { name: "Third" })).toHaveClass("is-selected");
    expect(screen.getByText("Third panel content")).toBeVisible();
    expect(screen.getByText("First panel content")).not.toBeVisible();
  });

  it("keeps multiple instances independent", async () => {
    const user = userEvent.setup();
    render(
      <>
        <section aria-label="First group">
          <Tabs items={ITEMS} />
        </section>
        <section aria-label="Second group">
          <Tabs items={ITEMS} defaultValue="two" />
        </section>
      </>,
    );

    const firstGroup = within(screen.getByRole("region", { name: "First group" }));
    const secondGroup = within(screen.getByRole("region", { name: "Second group" }));

    expect(firstGroup.getByRole("button", { name: "First" })).toHaveClass("is-selected");
    expect(secondGroup.getByRole("button", { name: "Second" })).toHaveClass("is-selected");

    await user.click(firstGroup.getByRole("button", { name: "Third" }));

    expect(firstGroup.getByRole("button", { name: "Third" })).toHaveClass("is-selected");
    expect(secondGroup.getByRole("button", { name: "Second" })).toHaveClass("is-selected");
    expect(secondGroup.getByText("Second panel content")).toBeVisible();
  });

  it("renders nothing for an empty item list", () => {
    const { container } = render(<Tabs items={[]} />);

    expect(container).toBeEmptyDOMElement();
  });
});
