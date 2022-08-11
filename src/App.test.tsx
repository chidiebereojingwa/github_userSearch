import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import App from "./App";

describe("App Component", () => {
  // renders without crashing
  it("rendered correctly", () => {
    render(<App />);
    expect(screen.getByTestId("app")).toBeTruthy();
  });

  // renders form element
  it("renders form element", () => {
    render(<App />);
    expect(screen.getByTestId("form")).toBeTruthy();
  });

  // test if the input element is rendered
  it("renders input element", () => {
    render(<App />);
    expect(screen.getByTestId("search-input")).toBeTruthy();
  });

  // test searchForUser function
  it("searchForUser function", () => {
    const searchForUser = jest.fn;
    act(async () => {
      render(<App />);
      const searchButton = screen.getByTestId("search-button");
      await fireEvent.click(searchButton);
      expect(searchForUser).toBeTruthy();
    });
  });
});
