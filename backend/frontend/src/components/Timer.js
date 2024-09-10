import { useState, useEffect } from 'react';
import { useWordOfTheDay } from '../hooks/useWordOfTheDay';

const Timer = () => {
    const [timeLeft, setTimeLeft] = useState(calculateTime())

    function calculateTime() {
        const now = new Date()
        const tommorow = new Date()
        tommorow.setHours(24, 0, 0, 0)

        const difference = tommorow - now
        
        let timeLeft = {}

        if (difference > 0) {
            timeLeft = {
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            }
        }
        return timeLeft
    }

    useEffect(() => {
        const timer = setInterval(() => {
            const newTimeLeft = calculateTime()
            setTimeLeft(calculateTime())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return (
        <div>
            <div>
                <h3>
                {timeLeft.hours !== undefined ? (
                    <>
                        <span>{String(timeLeft.hours).padStart(2, '0')}:</span>
                        <span>{String(timeLeft.minutes).padStart(2, '0')}:</span>
                        <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
                    </>
                ) : (
                    <span>Loading...</span>
                )}
                </h3>
            </div>
        </div>
    )

   
}

export default Timer