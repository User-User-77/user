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

    // Generate random 11-digit Order ID
    const generateRandomId = () => {
      return String(Math.floor(10000000000 + Math.random() * 90000000000))
    }
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

  const formatTime = (value) => {
    return String(value).padStart(2, '0')
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-[375px] mx-auto bg-white min-h-screen">
        {/* Header */}
        <header className="bg-white fixed top-0 left-0 right-0 z-10" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div className="max-w-[375px] mx-auto px-4 py-3 flex items-center justify-between">
            <button className="flex items-center justify-center w-8 h-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                style={{ color: '#1F2937' }}
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
            <h1 className="text-xl font-bold" style={{ color: '#00BAF2' }}>Paytm</h1>
            <button className="text-sm font-medium" style={{ color: '#00BAF2' }}>Help</button>
          </div>
        </header>

        {/* Main Content */}
        <div className="pt-16 px-4 pb-6">
          {/* Ticket Card */}
          <div className="bg-white rounded-3xl shadow-lg p-6 mt-6" style={{ boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            {/* Route Info */}
            <div className="text-center mb-6">
              {/* Logo - Centered */}
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#FFFFFF', border: '2px solid #E5E7EB', padding: '4px' }}>
                  <img src={janmargLogo} alt="Janmarg" className="w-full h-full object-contain" />
                </div>
              </div>
              <h2 className="text-xl font-bold mb-2 whitespace-nowrap" style={{ color: '#1F2937', lineHeight: '1.3' }}>
                Bopal Appr<span className="align-super text-base">...</span> → Gota Vasa<span className="align-super text-base">...</span>
              </h2>
              <p className="text-sm mb-1" style={{ color: '#6B7280' }}>AC</p>
              <p className="text-sm" style={{ color: '#4B5563' }}>1 Adult Ticket</p>
            </div>

            {/* Passenger Badge and Price - Centered */}
            <div className="flex flex-col items-center justify-center mb-6">
              {/* Person Circle with 1 next to it */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F3F4F6' }}>
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="4" fill="#6B7280"/>
                    <path d="M6 21c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="#6B7280" strokeWidth="2" fill="none"/>
                  </svg>
                </div>
                <span className="text-lg font-semibold" style={{ color: '#1F2937' }}>1</span>
              </div>
              {/* Price - Centered */}
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold" style={{ color: '#1F2937' }}>₹25</span>
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#10B981', borderRadius: '50%' }}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Success Message */}
            <div className="text-center mb-6">
              <p className="text-lg font-normal mb-2 whitespace-nowrap" style={{ color: '#1F2937', letterSpacing: '0.5px' }}>TICKET BOOKED SUCCESSFULLY</p>
              <p className="text-sm" style={{ color: '#6B7280' }}>{issuedOn}</p>
            </div>

            {/* Timer Section */}
            <div className="rounded-2xl p-5 mb-6" style={{ backgroundColor: '#F9FAFB' }}>
              <p className="text-sm text-center mb-4" style={{ color: '#6B7280' }}>Your ticket is valid for</p>
              {status === 'active' && timeRemaining && (
                <>
                  <div className="flex justify-center items-center gap-1 mb-3">
                    <span className="text-4xl font-bold" style={{ color: '#1F2937' }}>
                      {formatTime(timeRemaining.hours)}
                    </span>
                    <span className="text-4xl font-bold mx-1" style={{ color: 'black' }}>:</span>
                    <span className="text-4xl font-bold" style={{ color: '#1F2937' }}>
                      {formatTime(timeRemaining.minutes)}
                    </span>
                    <span className="text-4xl font-bold mx-1" style={{ color: 'black' }}>:</span>
                    <span className="text-4xl font-bold" style={{ color: '#1F2937' }}>
                      {formatTime(timeRemaining.seconds)}
                    </span>
                  </div>
                  <div className="flex justify-center items-center gap-8 text-xs uppercase mb-4" style={{ color: '#9CA3AF', letterSpacing: '0.5px' }}>
                    <span>HOURS</span>
                    <span>MINUTES</span>
                    <span>SECONDS</span>
                  </div>
                </>
              )}
              {status === 'not-active' && (
                <p className="text-center font-semibold mb-4" style={{ color: '#F59E0B' }}>Ticket not active yet</p>
              )}
              {status === 'expired' && (
                <p className="text-center font-semibold mb-4" style={{ color: '#EF4444' }}>Ticket expired</p>
              )}
              
              {/* View Tickets Button - Inside Timer Section */}
              <button
                onClick={onViewTicket}
                className="w-full text-white font-semibold py-4 rounded-xl transition-colors"
                style={{ backgroundColor: '#00BAF2', fontSize: '16px' }}
              >
                View your Tickets
              </button>
            </div>

            {/* Expected Arrivals Section */}
            <div className="bg-white rounded-2xl p-5 mb-4" style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold" style={{ color: '#1F2937' }}>Expected Arrivals</h3>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#6B7280' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="text-xs" style={{ color: '#6B7280' }}>Auto refresh in {autoRefreshTime} mins</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-3">
                {/* Bus 1 */}
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#00BAF2' }}>
                    <path d="M4 16c0 .88.39 1.67 1 2.22V20a1 1 0 001 1h1a1 1 0 001-1v-1h8v1a1 1 0 001 1h1a1 1 0 001-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-4.5H4V6h15v6.5z"/>
                  </svg>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#1F2937' }}>5D-NV</p>
                    <p className="text-xs" style={{ color: '#6B7280' }}>Arriving in 6 mins</p>
                  </div>
                </div>
                
                {/* Bus 2 */}
                <div className="flex items-center gap-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#00BAF2' }}>
                    <path d="M4 16c0 .88.39 1.67 1 2.22V20a1 1 0 001 1h1a1 1 0 001-1v-1h8v1a1 1 0 001 1h1a1 1 0 001-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-4.5H4V6h15v6.5z"/>
                  </svg>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#1F2937' }}>6D</p>
                    <p className="text-xs" style={{ color: '#6B7280' }}>Arriving in 8 mins</p>
                  </div>
                </div>
              </div>
              
              <button className="text-sm font-medium" style={{ color: '#00BAF2' }}>
                Check other buses &gt;
              </button>
            </div>

            {/* Trip Details Section */}
            <div className="bg-white rounded-2xl overflow-hidden mb-4" style={{ border: '1px solid #E5E7EB' }}>
              <button
                onClick={() => setIsTripDetailsExpanded(!isTripDetailsExpanded)}
                className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-base font-semibold" style={{ color: '#1F2937' }}>Trip Details</h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 transition-transform duration-200 ${
                    isTripDetailsExpanded ? 'rotate-180' : ''
                  }`}
                  style={{ color: '#6B7280' }}
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
                <div className="px-5 pb-4 space-y-4">
                  <div>
                    <p className="text-xs mb-1" style={{ color: '#6B7280' }}>OPERATOR</p>
                    <p className="text-sm font-medium" style={{ color: '#1F2937' }}>BRTS</p>
                  </div>
                  
                  <div>
                    <p className="text-xs mb-1" style={{ color: '#6B7280' }}>CHANGE OVER BUS STOP</p>
                    <p className="text-sm font-medium" style={{ color: '#1F2937' }}>Shivranjani</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs mb-1" style={{ color: '#6B7280' }}>Order ID: {orderId}</p>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(orderId)
                        }}
                        className="text-xs font-medium" style={{ color: '#00BAF2' }}
                      >
                        copy
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-xs leading-relaxed" style={{ color: '#6B7280' }}>
                    For any queries regarding QR Ticket, please contact BRTS with Order Id.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketBooking

