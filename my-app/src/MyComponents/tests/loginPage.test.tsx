import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import Login from "../loginPage";

describe("Login component", () => {
  it("submits form with correct email and password", () => {
    render(<Login />)
    expect(screen.getByTestId("email")).toBeInTheDocument()
    expect(screen.getByTestId("password")).toBeInTheDocument()
    expect(screen.getByTestId("loginBtn")).toBeInTheDocument()
    act(() => {
      fireEvent.click(screen.getByTestId("loginBtn"))
    })
  });
});
