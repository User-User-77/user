import React, { useState, useEffect } from 'react'
import janmargLogo from '../assets/janmarglogo.jpg'

const TicketBooking = ({ onViewTicket }) => {
  const [timeRemaining, setTimeRemaining] = useState(null)
  const [status, setStatus] = useState('loading')
  const [issuedOn, setIssuedOn] = useState('')
  const [orderId, setOrderId] = useState('')
  const [isTripDetailsExpanded, setIsTripDetailsExpanded] = useState(true)
  const [autoRefreshTime, setAutoRefreshTime] = useState(2)

  useEffect(() => {
    const today = new Date()
    const day = String(today.getDate()).padStart(2, '0')
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const month = monthNames[today.getMonth()]
    const year = today.getFullYear()
    setIssuedOn(`${day} ${month} ${year}, 07:03 PM`)

    const generateRandomId = () => String(Math.floor(10000000000 + Math.random() * 90000000000))
    setOrderId(generateRandomId())

    const updateTimer = () => {
      const now = new Date()
      const sevenPM = new Date(now)
      sevenPM.setHours(19, 3, 0, 0)
      const tenPM = new Date(now)
      tenPM.setHours(22, 0, 0, 0)

      if (now < sevenPM) {
        setStatus('not-active')
        setTimeRemaining(null)
      } else if (now >= sevenPM && now < tenPM) {
        setStatus('active')
        const diff = tenPM - now
        const hours = Math.floor(diff / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)
        setTimeRemaining({ hours, minutes, seconds })
      } else {
        setStatus('expired')
        setTimeRemaining(null)
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (value) => String(value).padStart(2, '0')

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      {/* Header */}
      <div className="w-full max-w-[380px] bg-white flex justify-between items-center px-6 py-4 shadow-sm">
        <button className="flex items-center justify-center w-8 h-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M5 12L12 19M5 12L12 5" />
          </svg>
        </button>
        <h1 className="text-xl font-bold select-none">
          <span className="text-[#00BAF2]">Pay</span>
          <span className="text-[#012B72]">tm</span>
        </h1>
        <button className="text-sm font-medium text-[#00BAF2]">Help</button>
      </div>

      {/* Main light blue background area */}
      <div className="w-full max-w-[380px] bg-[#D8F1FF] flex flex-col items-center pb-10">
        {/* Top Ticket Section */}
        <div className="w-[90%] mt-6 rounded-2xl bg-[#D8F1FF] shadow-sm flex flex-col items-center text-center pb-5">
          <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center p-2 mb-3 mt-3 bg-white">
            <img src={janmargLogo} alt="Janmarg" className="w-full h-full object-contain rounded-full" />
          </div>
          <h2 className="text-lg font-bold text-gray-800">Bopal App → Gota Vasan</h2>
          <p className="text-sm text-gray-700 mt-1">AC · 1 Adult Ticket</p>

          <div className="flex flex-col items-center justify-center mt-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-700" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" fill="#6B7280" />
                  <path d="M6 21c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="#6B7280" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <span className="text-lg font-semibold text-gray-800">1</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">₹25</span>
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          <p className="text-sm font-medium text-gray-800 mt-3">TICKET BOOKED SUCCESSFULLY</p>
          <p className="text-xs text-gray-600 mt-1">{issuedOn}</p>
        </div>

        {/* White box: Timer */}
        <div className="w-[90%] mt-5 rounded-2xl bg-white p-5 border border-gray-100 text-center shadow-sm">
          <p className="text-sm text-gray-500 mb-3">Your ticket is valid for</p>
          {status === 'active' && timeRemaining && (
            <>
              <div className="flex justify-center items-center gap-2 mb-3">
                <span className="text-4xl font-bold text-gray-800">{formatTime(timeRemaining.hours)}</span>
                <span className="text-4xl font-bold text-gray-700">:</span>
                <span className="text-4xl font-bold text-gray-800">{formatTime(timeRemaining.minutes)}</span>
                <span className="text-4xl font-bold text-gray-700">:</span>
                <span className="text-4xl font-bold text-gray-800">{formatTime(timeRemaining.seconds)}</span>
              </div>
              <div className="flex justify-center items-center gap-8 text-xs uppercase text-gray-400">
                <span>HOURS</span>
                <span>MINUTES</span>
                <span>SECONDS</span>
              </div>
            </>
          )}
          {status === 'not-active' && <p className="font-semibold text-yellow-500">Ticket not active yet</p>}
          {status === 'expired' && <p className="font-semibold text-red-500">Ticket expired</p>}

          <button
            onClick={onViewTicket}
            className="w-full bg-[#00BAF2] text-white font-semibold py-3 rounded-xl mt-4"
          >
            View your Tickets
          </button>
        </div>

        {/* Expected arrivals */}
        <div className="w-[90%] mt-5 rounded-2xl bg-white p-5 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-gray-800">Expected Arrivals</h3>
            <div className="flex items-center gap-2 text-gray-500 text-xs">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Auto refresh in {autoRefreshTime} mins
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-3">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-[#00BAF2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 16c0 .88.39 1.67 1 2.22V20a1 1 0 001 1h1a1 1 0 001-1v-1h8v1a1 1 0 001 1h1a1 1 0 001-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-gray-800">5D-NV</p>
                <p className="text-xs text-gray-500">Arriving in 6 mins</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-[#00BAF2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 16c0 .88.39 1.67 1 2.22V20a1 1 0 001 1h1a1 1 0 001-1v-1h8v1a1 1 0 001 1h1a1 1 0 001-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-gray-800">6D</p>
                <p className="text-xs text-gray-500">Arriving in 8 mins</p>
              </div>
            </div>
          </div>

          <button className="text-sm font-medium text-[#00BAF2]">Check other buses &gt;</button>
        </div>

        {/* Trip details */}
        <div className="w-[90%] mt-5 rounded-2xl bg-white border border-gray-200 px-5 py-3 shadow-sm">
          <button
            onClick={() => setIsTripDetailsExpanded(!isTripDetailsExpanded)}
            className="w-full flex items-center justify-between py-2"
          >
            <h3 className="text-base font-semibold text-gray-800">Trip Details</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${isTripDetailsExpanded ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isTripDetailsExpanded ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <div className="pb-3 space-y-4 mt-2">
              <div>
                <p className="text-xs text-gray-500 mb-1">OPERATOR</p>
                <p className="text-sm font-medium text-gray-800">BRTS</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">CHANGE OVER BUS STOP</p>
                <p className="text-sm font-medium text-gray-800">Shivranjani</p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500">Order ID: {orderId}</p>
                <button
                  onClick={() => navigator.clipboard.writeText(orderId)}
                  className="text-xs font-medium text-[#00BAF2]"
                >
                  Copy
                </button>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                For any queries regarding QR Ticket, please contact BRTS with Order Id.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketBooking
