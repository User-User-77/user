import React from 'react'
import { QRCodeSVG } from 'qrcode.react'

const QRCodeSection = () => {
  // Dummy data for QR code
  const qrData = "q5FxS0xxoJSyaOiRNPW4dFanF0z0DrBb+qgsrock6jyvw5bbA3mSFNg7yYq7AhlbwYrbR3W0l6nWDFO1JYxDp1TVdnOnO3Hp"

  return (
    <div className="bg-white px-3 sm:px-6 py-8 text-center">
      {/* Route Text */}
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-10 px-1 sm:px-4 leading-normal whitespace-nowrap">
        Bopal App<span className="align-super text-base sm:text-lg">...</span> → Gota Vasan<span className="align-super text-base sm:text-lg">...</span>
      </h2>
      
      {/* Subtitle */}
      <p className="text-sm text-gray-600 mb-6">
        Scan this QR at Entry & Exit Points
      </p>

      {/* QR Code */}
      <div className="flex justify-center mb-0">
        <QRCodeSVG
          value={qrData}
          size={300}
          level="M"
          includeMargin={false}
          style={{ width: '390px', height: '390px' }}
        />
      </div>
    </div>
  )
}

export default QRCodeSection

