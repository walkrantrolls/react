import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Tabs from "./tabs";

describe("Tabs", () => {
  it("marks HTML as the active panel by default", () => {
    render(<Tabs />);

    expect(screen.getByRole("button", { name: "HTML" })).toBeInTheDocument();
    expect(screen.getByText(/HyperText Markup Language/)).toHaveClass("active");
    expect(screen.getByText(/Cascading Style Sheets/)).not.toHaveClass("active");
    expect(screen.getByText(/one of the core technologies/)).not.toHaveClass("active");
  });

  it("marks CSS active after its button is clicked", async () => {
    const user = userEvent.setup();
    render(<Tabs />);

    await user.click(screen.getByRole("button", { name: "CSS" }));

    expect(screen.getByText(/Cascading Style Sheets/)).toHaveClass("active");
    expect(screen.getByText(/HyperText Markup Language/)).not.toHaveClass("active");
  });

  it("switches among all three panels", async () => {
    const user = userEvent.setup();
    render(<Tabs />);

    await user.click(screen.getByRole("button", { name: "JavaScript" }));
    expect(screen.getByText(/one of the core technologies/)).toHaveClass("active");

    await user.click(screen.getByRole("button", { name: "HTML" }));
    expect(screen.getByText(/HyperText Markup Language/)).toHaveClass("active");
  });
});
