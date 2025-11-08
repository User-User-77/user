import React from 'react'
import Header from './components/Header'
import QRCodeSection from './components/QRCodeSection'
import TimerSection from './components/TimerSection'
import TicketDetails from './components/TicketDetails'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile container - max width 375px, centered */}
      <div className="max-w-[375px] mx-auto bg-white min-h-screen shadow-lg">
        <Header />
        {/* Add padding top to account for fixed header */}
        <div className="pt-16">
          <QRCodeSection />
          <TimerSection />
          <TicketDetails />
        </div>
      </div>
    </div>
  )
}

export default App

