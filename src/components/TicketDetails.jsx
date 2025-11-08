import React, { useState, useEffect } from 'react'

const TicketDetails = () => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [orderId, setOrderId] = useState('')
  const [orderItemId, setOrderItemId] = useState('')
  const [issuedOn, setIssuedOn] = useState('')

  useEffect(() => {
    // Generate random 11-digit numbers
    const generateRandomId = () => {
      return String(Math.floor(10000000000 + Math.random() * 90000000000))
    }

    setOrderId(generateRandomId())
    setOrderItemId(generateRandomId())

    // Set current date at 07:00 PM (format: "04 Nov 2025, 07:00 PM")
    const today = new Date()
    const day = String(today.getDate()).padStart(2, '0')
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const month = monthNames[today.getMonth()]
    const year = today.getFullYear()
    setIssuedOn(`${day} ${month} ${year}, 07:03 PM`)
  }, [])

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="bg-white mx-4 mb-4 rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <button
        onClick={toggleExpand}
        className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
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

      {/* Collapsible Content (All fields) */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="px-4 pb-4 space-y-2.5">
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
  )
}

export default TicketDetails

