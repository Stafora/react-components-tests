import { render, screen } from "@testing-library/react"
import { test, expect } from "vitest"

import Counter from "./index";
import React from "react";

test("renders Counter component", () => {
    render(<Counter />);
    expect(screen.getByText(/count is 0/i)).toBeInTheDocument();
});
