import { render, screen } from "@testing-library/react";
import Home from "./page";

test("renders the landing page", () => {
  render(<Home />);
});
