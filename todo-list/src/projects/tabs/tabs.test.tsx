import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Tabs from "./tabs";

describe("Tabs", () => {
  it("shows HTML content by default", () => {
    render(<Tabs />);

    expect(screen.getByRole("button", { name: "HTML" })).toBeInTheDocument();
    expect(
      screen.getByText(/HyperText Markup Language/),
    ).toBeVisible();
    expect(
      screen.getByText(/Cascading Style Sheets/),
    ).not.toBeVisible();
  });

  it("shows the selected panel when a tab is clicked", async () => {
    const user = userEvent.setup();
    render(<Tabs />);

    await user.click(screen.getByRole("button", { name: "CSS" }));

    expect(
      screen.getByText(/Cascading Style Sheets/),
    ).toBeVisible();
    expect(
      screen.getByText(/HyperText Markup Language/),
    ).not.toBeVisible();
  });

  it("switches among all three panels", async () => {
    const user = userEvent.setup();
    render(<Tabs />);

    await user.click(screen.getByRole("button", { name: "JavaScript" }));
    expect(
      screen.getByText(/one of the core technologies/),
    ).toBeVisible();

    await user.click(screen.getByRole("button", { name: "HTML" }));
    expect(
      screen.getByText(/HyperText Markup Language/),
    ).toBeVisible();
  });
});
