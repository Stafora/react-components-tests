import { fireEvent, render, renderHook, screen, waitFor } from "@testing-library/react"
import React, { act } from 'react'
import MoleGameComponent, { randomInterval, useMoleGame } from '../ui/mole-game'

describe('randomInterval', () => {
    it('returns a number between min and max inclusive', () => {
        for (let i = 0; i < 20; i++) {
            const result = randomInterval(1, 5)
            expect(result).toBeGreaterThanOrEqual(1)
            expect(result).toBeLessThanOrEqual(5)
        }
    })
})

describe('useMoleGame Hook', () => {
    it('starts and stops game correctly', () => {
        const { result } = renderHook(() => useMoleGame(4))

        act(() => {
            result.current.toggleGame()
        })

        expect(result.current.gameInProcess).toBe(true)

        act(() => {
            result.current.toggleGame()
        })

        expect(result.current.gameInProcess).toBe(false)
        expect(result.current.activeHole).toBe(null)
    })

    it('increases score on correct hit', async () => {
        const { result } = renderHook(() => useMoleGame(4))

        act(() => {
            result.current.toggleGame()
        })

        await waitFor(() => {
            expect(result.current.activeHole).not.toBeNull()
        })

        act(() => {
            result.current.hitMole(result.current.activeHole!)
        })

        expect(result.current.score).toBe(1)
    })
})

describe('Render Component', () => {
    it('renders title, button, holes and score', () => {
        render(<MoleGameComponent />)

        const title = screen.getByText('Try Kill Mole!!!')
        const button = screen.getByText(/Start|Stop/)
        const score = screen.getByText(/Score:/)
        const holesContainer = document.querySelector('[data-cy-holes]')
        const holes = holesContainer?.querySelectorAll('[data-cy-hole]')

        expect(title).toBeInTheDocument()
        expect(button).toBeInTheDocument()
        expect(score).toBeInTheDocument()
        expect(holes?.length).toBe(16)
    })

    it('starts and stops the game when button is clicked', () => {
        render(<MoleGameComponent />)

        const button = screen.getByText(/Start/)

        fireEvent.click(button)
        expect(button.textContent).toBe('Stop')

        fireEvent.click(button)
        expect(button.textContent).toBe('Start')
    })

    it('updates score when mole is hit', async () => {
        render(<MoleGameComponent />)

        const button = screen.getByText(/Start/)
        fireEvent.click(button)

        const mole = await screen.findByText('MOLE')
        const moleHole = mole.closest('[data-cy-hole]')

        fireEvent.click(moleHole!)

        await waitFor(() => {
            const scoreText = screen.getByText(/Score: \d+/)
            expect(scoreText.textContent).toMatch(/Score: [1-9][0-9]*/)
        })
    })
})
