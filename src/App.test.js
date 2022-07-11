import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("Main App Testing", () => {
  // test("Showing 10 mins  on clicking long break", () => {
  //   render(<App />);

  //   const h1Element = screen.getByText("Long Break");
  //   userEvent.click(h1Element);
  //   const outputElement = screen.getByText("10" + ":" + "00", { exact: true });
  //   expect(outputElement).toBeInTheDocument();
  // });
  // test("Showing 5 mins  on clicking short break", () => {
  //   render(<App />);

  //   const h1Element = screen.getByText("Short Break");
  //   userEvent.click(h1Element);
  //   const outputElement = screen.getByText("5" + ":" + "00", { exact: true });
  //   expect(outputElement).toBeInTheDocument();
  // });

  // test("Rendering 25 mins  Default", () => {
  //   render(<App />);

  //   const outputElement = screen.getByText("1" + ":" + "00", { exact: true });
  //   expect(outputElement).toBeInTheDocument();
  // });
  test("start button click event gives stop button", () => {
    render(<App />);

    const startButtonElement = screen.getByRole("button", { name: /Start/i });
    userEvent.click(startButtonElement);

    const stopButtonElement = screen.getByRole("button", { name: /Stop/i });
    expect(stopButtonElement).toBeInTheDocument();
  });

  test("stop button click event gives start button", () => {
    render(<App />);

    const startButtonElement = screen.getByRole("button", { name: /Start/i });
    userEvent.click(startButtonElement);

    const stopButtonElement = screen.getByRole("button", { name: /Stop/i });
    userEvent.click(stopButtonElement);
    expect(startButtonElement).toBeInTheDocument();
  });

  test("showing start button on timeUp", async () => {
    render(<App />);
    const startButtonElement = screen.getByRole("button", { name: /Start/i });
    userEvent.click(startButtonElement);

    await new Promise((r) => setTimeout(r, 4000));

    expect(startButtonElement).toBeInTheDocument();
  });
  test("after 4 sec", async () => {
    render(<App />);
    const startButtonElement = screen.getByRole("button", { name: /Start/i });
    userEvent.click(startButtonElement);
    await new Promise((r) => setTimeout(r, 4000));
    const svgElement = screen.getByTestId("svg-mute-icon");
    expect(svgElement).toBeInTheDocument();
  });
  test("after 4 sec audio", async () => {
    render(<App />);
    const startButtonElement = screen.getByRole("button", { name: /Start/i });
    userEvent.click(startButtonElement);
    await new Promise((r) => setTimeout(r, 4000));
    const audioElement = screen.getByTestId("alarm-audio");
    expect(audioElement).toBeInTheDocument();
  });
});
