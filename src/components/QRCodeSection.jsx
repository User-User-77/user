import React from 'react'
import { QRCodeSVG } from 'qrcode.react'

const QRCodeSection = () => {
  // Dummy data for QR code
  const qrData = "q5FxS0xxoJSyaOiRNPW4dFanF0z0DrBb+qgsrock6jyvw5bbA3mSFNg7yYq7AhlbwYrbR3W0l6nWDFO1JYxDp1TVdnOnO3Hp"

  return (
    <div className="bg-white px-6 py-8 text-center">
      {/* Route Text */}
      <h2 className="text-xl font-semibold text-gray-900 mb-7 px-4 leading-normal">
        Bopal App... → Gota Vasan...
      </h2>
      
      {/* Subtitle */}
      <p className="text-sm text-gray-600 mb-6">
        Scan this QR at Entry & Exit Points
      </p>

      {/* QR Code */}
      <div className="flex justify-center mb-0">
        <QRCodeSVG
          value={qrData}
          size={200}
          level="M"
          includeMargin={false}
          style={{ width: '250px', height: '250px' }}
        />
      </div>
    </div>
  )
}

export default QRCodeSection

