import { render, screen } from "@testing-library/react"
import { test, expect } from "vitest"
import userEvent from "@testing-library/user-event";

import React from "react";

import Button from './Button'

describe('Render Button', () => {
    test("Render, snapshot, has in document", () => {
        const { asFragment } = render(
            <Button type={'button'} viewType={'primary'} >
                It is Button
            </Button>
        )
        expect(screen.getByText('It is Button')).toBeInTheDocument()
        expect(asFragment()).toMatchSnapshot()
    })

    test("Button has class correct", () => {
        render(
            <Button className={'class-for-test'} type={'button'} viewType={'primary'} >
                It is Button
            </Button>
        )
        const button = screen.getByRole('button')
        expect(button).toHaveClass('class-for-test')
    })

    test("Button has type correct", () => {
        render(
            <Button className={'class-for-test'} type={'button'} viewType={'primary'} >
                It is Button
            </Button>
        )
        const button1 = screen.getByRole('button')
        expect(button1).toHaveAttribute("type", "button")
    })

    test("Button has event on click", async () => {
        const handleClick = vi.fn()
    
        render(
            <Button eventClick={handleClick} type={'button'} viewType={'primary'} >
                It is Button
            </Button>
        )
    
        const button = screen.getByRole("button");
    
        await userEvent.click(button); // Или fireEvent.click(button);
    
        expect(handleClick).toHaveBeenCalledTimes(1); // Проверяем, что функция вызвалась 1 раз
    })

    test("Button is disabled", async () => {
        const handleClick = vi.fn();
        
        render(<Button disabled eventClick={handleClick} type={'button'} viewType={'primary'}>It is Button</Button>);
    
        const button = screen.getByRole("button");
        
        expect(button).toBeDisabled();
        
        await userEvent.click(button);
        expect(handleClick).not.toHaveBeenCalled(); // Обработчик не должен сработать
    })

    test("Button check viewType", () => {
        render(
            <Button type={'button'} viewType={'danger'}>It is Button</Button>
        )

        const button = screen.getByRole('button')

        expect(button).toHaveClass('bg-red-400')
        expect(button).toHaveClass('border-red-400')
    })
})