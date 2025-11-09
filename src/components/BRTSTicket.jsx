import React, { useState, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import ticketIcon from '../assets/ticket-icon.svg'

const BRTSTicket = ({ onBack }) => {
  // Timer state
  const [timeRemaining, setTimeRemaining] = useState(null)
  const [status, setStatus] = useState('loading')
  
  // Ticket Details state
  const [isExpanded, setIsExpanded] = useState(true)
  const [orderId, setOrderId] = useState('')
  const [orderItemId, setOrderItemId] = useState('')
  const [issuedOn, setIssuedOn] = useState('')

  // QR code data
  const qrData = "BRTS-TICKET-123456789"

  // Timer effect
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date()
      
      const sevenPM = new Date(now)
      sevenPM.setHours(19, 0, 0, 0) // 7 PM today

      const tenPM = new Date(now)
      tenPM.setHours(22, 0, 0, 0) // 10 PM today

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

  // Ticket Details effect
  useEffect(() => {
    const generateRandomId = () => {
      return String(Math.floor(10000000000 + Math.random() * 90000000000))
    }

    setOrderId(generateRandomId())
    setOrderItemId(generateRandomId())

    const today = new Date()
    const day = String(today.getDate()).padStart(2, '0')
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const month = monthNames[today.getMonth()]
    const year = today.getFullYear()
    setIssuedOn(`${day} ${month} ${year}, 07:03 PM`)
  }, [])

  const formatTime = (value) => {
    return String(value).padStart(2, '0')
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[375px] mx-auto bg-white min-h-screen shadow-lg">
        {/* Header */}
        <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
          <div className="max-w-[375px] mx-auto py-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button 
                onClick={onBack}
                className="flex items-center justify-center w-8 h-8"
              >
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
              <img src={ticketIcon} alt="Ticket" className="w-5 h-5" />
              <h1 className="text-lg font-semibold text-gray-900">1 QR Ticket</h1>
            </div>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
              Help
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="pt-20">
          {/* QR Code Section */}
          <div className="bg-white py-8 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8 leading-normal whitespace-nowrap">
              Bopal App<span className="align-super text-base sm:text-lg">...</span> → Gota Vasan<span className="align-super text-base sm:text-lg">...</span>
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Scan this QR at Entry & Exit Points
            </p>
            <div className="flex justify-center mb-2">
              <QRCodeSVG
                value={qrData}
                size={300}
                level="M"
                includeMargin={false}
                style={{ width: '300px', height: '300px' }}
              />
            </div>
          </div>

          {/* Timer Section */}
          <div className="bg-white pt-2 pb-6 text-center">
            <p className="text-sm text-gray-600 mb-4">Your ticket is valid for</p>

            {status === 'not-active' && (
              <div className="text-lg font-semibold text-orange-600 mb-4">
                Ticket not active yet
              </div>
            )}

            {status === 'active' && timeRemaining && (
              <>
                <div className="flex justify-center items-center gap-1 mb-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatTime(timeRemaining.hours)}
                  </span>
                  <span className="text-3xl font-bold text-gray-400 mx-1">:</span>
                  <span className="text-3xl font-bold text-gray-900">
                    {formatTime(timeRemaining.minutes)}
                  </span>
                  <span className="text-3xl font-bold text-gray-400 mx-1">:</span>
                  <span className="text-3xl font-bold text-gray-900">
                    {formatTime(timeRemaining.seconds)}
                  </span>
                </div>
                <div className="flex justify-center items-center gap-6 text-xs text-gray-500 mt-2">
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

          {/* Ticket Details */}
          <div className="bg-white mx-4 mb-4 rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <button
              onClick={toggleExpand}
              className="w-full py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <h3 className="text-base font-semibold text-gray-900">Ticket Details</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 text-gray-600 transition-transform duration-200 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
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
                isExpanded ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="pb-4 space-y-2.5">
                <div className="pt-3 pb-2.5 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <span className="text-sm text-gray-600">Issued On</span>
                    <span className="text-sm font-medium text-gray-900 text-right max-w-[60%]">
                      {issuedOn}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-start pb-2.5 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Order ID</span>
                  <span className="text-sm font-medium text-gray-900 text-right max-w-[60%]">
                    {orderId}
                  </span>
                </div>

                <div className="flex justify-between items-start pb-2.5 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Order Item ID</span>
                  <span className="text-sm font-medium text-gray-900 text-right max-w-[60%]">
                    {orderItemId}
                  </span>
                </div>

                <div className="flex justify-between items-start pb-2.5 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Ticket Type</span>
                  <span className="text-sm font-medium text-gray-900 text-right">
                    1 Adult
                  </span>
                </div>

                <div className="flex justify-between items-start">
                  <span className="text-sm text-gray-600">Bus Service Type</span>
                  <span className="text-sm font-medium text-gray-900 text-right">
                    (AC)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BRTSTicket

