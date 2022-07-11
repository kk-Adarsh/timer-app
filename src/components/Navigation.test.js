import { render, screen } from "@testing-library/react";
import Navigations from "./Navigations";

test("Pomdodre renering", () => {
  render(<Navigations />);

  const element = screen.getByText("Pomodoro");
  expect(element).toBeInTheDocument();
});
