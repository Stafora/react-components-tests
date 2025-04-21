import style from '@/modules/mole-game/styles/style.module.css'
import { useEffect, useRef, useState } from 'react'

export const randomInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export const useMoleGame = (holeCount: number = 16) => {
    const [gameInProcess, setGameInProcess] = useState(false)
    const [activeHole, setActiveHole] = useState<number | null>(null)
    const [score, setScore] = useState(0)

    const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const showTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    const clearTimers = () => {
        if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current)
        if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current)
    }

    const showMole = () => {
        if (!gameInProcess) return

        const nextHole = Math.floor(Math.random() * holeCount)
        setActiveHole(nextHole)

        hideTimeoutRef.current = setTimeout(() => {
            setActiveHole(null)
            showTimeoutRef.current = setTimeout(() => {
                showMole()
            }, randomInterval(500, 1500))
        }, randomInterval(500, 1500))
    }

    const hitMole = (index: number) => {
        if (index === activeHole) {
            setScore((prev) => prev + 1)
            setActiveHole(null)
            clearTimers()
            showTimeoutRef.current = setTimeout(() => {
                showMole()
            }, randomInterval(500, 1500))
        }
    }

    const toggleGame = () => {
        if (gameInProcess) {
            clearTimers()
            setGameInProcess(false)
            setActiveHole(null)
        } else {
            setScore(0)
            setGameInProcess(true)
        }
    }

    useEffect(() => {
        if (gameInProcess) {
            showMole()
        } else {
            clearTimers()
            setActiveHole(null)
        }

        return () => clearTimers()
    }, [gameInProcess])

    return {
        gameInProcess,
        activeHole,
        score,
        toggleGame,
        hitMole,
        holes: Array.from({ length: holeCount }),
    }
}

const MoleGame = () => {
    const {
        gameInProcess,
        activeHole,
        score,
        toggleGame,
        hitMole,
        holes,
    } = useMoleGame()

    return (
        <>
            <h2 data-cy-title className={style.title}>Try Kill Mole!!!</h2>

            <div data-cy-holes className={style.holes}>
                {holes.map((_, i) => (
                    <div key={i}
                         data-cy-hole={i}
                         className={style.hole}
                         onClick={() => hitMole(i)}
                    >
                        <span>
                            {activeHole === i ? 'MOLE' : ''}
                        </span>
                    </div>
                ))}
            </div>

            <button data-cy-button className={style.button} onClick={toggleGame}>
                {gameInProcess ? 'Stop' : 'Start'}
            </button>

            <div data-cy-score className={style.score}>Score: {score}</div>
        </>
    )
}

export default MoleGame
