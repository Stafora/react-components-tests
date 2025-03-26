import { useCallback, useState } from 'react'
import React from 'react'
import Button from '@/components/buttons/Button'

export const useCounter = () => {
    const [count, setCount] = useState(0)

    const eventCount = useCallback(() => {
        setCount((count) => count + 1)
    }, [])

    return {
        count,
        eventCount
    }
}

const Counter = () => {
    const { count, eventCount } = useCounter()

    return (
        <>
            <h1>
                Counter
            </h1>

            <div className="card">
                <Button data-cy="button" type={'button'} viewType={'primary'} eventClick={eventCount} className="mb-2">
                    count is {count}
                </Button>
                <p>
                    Counter component
                </p>
            </div>
        </>
    )
}

export default Counter
