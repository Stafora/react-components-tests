import { render, renderHook, screen } from "@testing-library/react"
import { test, expect } from "vitest"

import Counter, { useCounter } from "./index";
import React, { act } from "react";

describe('Render Component', () => {
    test("Counter component has default text", () => {
        render(<Counter />)
        expect(screen.getByText(/count is 0/i)).toBeInTheDocument()
    })
    test("Counter snapshot", () => {
        const { asFragment } = render(<Counter />)
        expect(asFragment()).toMatchSnapshot()
    })
})
describe('useCounter', () => {
    it('должен инициализироваться с 0', () => {
        const { result } = renderHook(() => useCounter())
        expect(result.current.count).toBe(0)
    })

    it('useCounter has function eventCount', () => {
        const { result } = renderHook(() => useCounter())
        expect(typeof result.current.eventCount).toBe('function')
    })

    it('должен увеличивать счётчик при вызове eventCount', () => {
        const { result } = renderHook(() => useCounter())

        act(() => {
            result.current.eventCount()
        })

        expect(result.current.count).toBe(1)

        act(() => {
            result.current.eventCount()
        })

        expect(result.current.count).toBe(2)
    })
})