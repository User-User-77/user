import React from 'react'
import ticketIcon from '../assets/ticket-icon.svg'

const Header = () => {
  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
      <div className="max-w-[375px] mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left Arrow, Icon and Title */}
        <div className="flex items-center gap-2">
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
          <img src={ticketIcon} alt="Ticket" className="w-5 h-5" />
          <h1 className="text-lg font-semibold text-gray-900">1 QR Ticket</h1>
        </div>

        {/* Right Help */}
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
          Help
        </button>
      </div>
    </header>
  )
}

export default Header

