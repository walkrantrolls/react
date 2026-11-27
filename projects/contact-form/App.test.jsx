import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App.jsx";

describe("Contact form project", () => {
  it("renders labeled name, email, and message fields", () => {
    render(<App />);

    expect(screen.getByRole("textbox", { name: "Name:" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Email:" })).toHaveAttribute("type", "email");
    expect(screen.getByRole("textbox", { name: "Message:" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("posts the form values as JSON and shows the response", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({
      text: async () => "Form submitted successfully",
    });
    vi.stubGlobal("fetch", fetchMock);
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    render(<App />);

    await user.type(screen.getByRole("textbox", { name: "Name:" }), "Ada Lovelace");
    await user.type(screen.getByRole("textbox", { name: "Email:" }), "ada@example.com");
    await user.type(screen.getByRole("textbox", { name: "Message:" }), "Hello");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());
    expect(fetchMock).toHaveBeenCalledWith(
      "https://questions.greatfrontend.com/api/questions/contact-form",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Ada Lovelace",
          email: "ada@example.com",
          message: "Hello",
        }),
      },
    );
    expect(alertMock).toHaveBeenCalledWith("Form submitted successfully");
  });

  it("shows the error message if the request fails", async () => {
    const user = userEvent.setup();
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => expect(alertMock).toHaveBeenCalledWith("Error submitting form!"));
  });
});
