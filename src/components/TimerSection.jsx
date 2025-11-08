import React, { useState, useEffect } from 'react'

const TimerSection = () => {
  const [timeRemaining, setTimeRemaining] = useState(null)
  const [status, setStatus] = useState('loading') // 'loading', 'not-active', 'active', 'expired'

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date()
      
      // Set 7 PM and 10 PM for today in local time
      const sevenPM = new Date(now)
      sevenPM.setHours(19, 0, 0, 0) // 7 PM today

      const tenPM = new Date(now)
      tenPM.setHours(22, 0, 0, 0) // 10 PM today

      if (now < sevenPM) {
        // Before 7 PM today - ticket not active yet
        setStatus('not-active')
        setTimeRemaining(null)
      } else if (now >= sevenPM && now < tenPM) {
        // Between 7 PM and 10 PM today - active countdown
        setStatus('active')
        const diff = tenPM - now
        const hours = Math.floor(diff / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)
        setTimeRemaining({ hours, minutes, seconds })
      } else {
        // After 10 PM today - ticket expired
        setStatus('expired')
        setTimeRemaining(null)
      }
    }

    // Update immediately
    updateTimer()

    // Update every second
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (value) => {
    return String(value).padStart(2, '0')
  }

  return (
    <div className="bg-white px-6 pt-2 pb-6 text-center">
      <p className="text-sm text-gray-600 mb-4">Your ticket is valid for</p>

      {status === 'not-active' && (
        <div className="text-lg font-semibold text-orange-600 mb-4">
          Ticket not active yet
        </div>
      )}

      {status === 'active' && timeRemaining && (
        <>
          <div className="flex justify-center items-center gap-1 mb-1">
            <span className="text-3xl font-bold text-gray-900">
              {formatTime(timeRemaining.hours)}
            </span>
            <span className="text-3xl font-bold text-black-400 mx-1">:</span>
            <span className="text-3xl font-bold text-gray-900">
              {formatTime(timeRemaining.minutes)}
            </span>
            <span className="text-3xl font-bold text-black-400 mx-1">:</span>
            <span className="text-3xl font-bold text-gray-900">
              {formatTime(timeRemaining.seconds)}
            </span>
          </div>
          <div className="flex justify-center items-center gap-3 text-xs text-gray-500 mt-2">
            <span>HOURS</span>
            <span>MINUTES</span>
            <span>SECONDS</span>
          </div>
        </>
      )}

      {status === 'expired' && (
        <div className="text-lg font-semibold text-red-600 mb-4">
          Ticket expired
        </div>
      )}
    </div>
  )
}

export default TimerSection

