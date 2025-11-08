import React, { useState } from 'react'
import BRTSTicket from './components/BRTSTicket'
import TicketBooking from './components/TicketBooking'

function App() {
  const [showTicket, setShowTicket] = useState(false)

  const handleViewTicket = () => {
    setShowTicket(true)
  }

  const handleBack = () => {
    setShowTicket(false)
  }

  if (showTicket) {
    return <BRTSTicket onBack={handleBack} />
  }

  return <TicketBooking onViewTicket={handleViewTicket} />
}

export default App

