import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Home from "./page";

test("renders the landing page", () => {
  render(<Home />);
});

test("the 'Original' option selected by default", () => {
  render(<Home />);

  const originalOption = screen.getByRole("option", {
    name: "Original",
  }) as HTMLOptionElement;
  expect(originalOption.selected).toBe(true);
});
