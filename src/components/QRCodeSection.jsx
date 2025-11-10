import React from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { GoArrowRight } from "react-icons/go";

const QRCodeSection = () => {
  const qrData =
    'q5FxS0xxoJSyaOiRNPW4dFanF0z0DrBb+qgsrock6jyvw5bbA3mSFNg7yYq7AhlbwYrbR3W0l6nWDFO1JYxDp1TVdnOnO3Hp'

  return (
    <div className="bg-white py-8 text-center">
  <h2 className="w-full text-[1.55rem] sm:text-[2.8rem] font-extrabold text-gray-900 mb-10 leading-tight flex justify-between items-center whitespace-nowrap">
  <span>Bopal App<span className="align-super text-[1.7rem] sm:text-[1.8rem] font-extrabold">...</span>
</span>
  <span className="mx-0.5 text-[1.8rem] sm:text-[3rem]"><GoArrowRight /></span>
  <span>Gota Vasan<span className="align-super text-[1.7rem] sm:text-[1.8rem] font-extrabold">...</span></span>
</h2>


  <p className="text-sm text-gray-600 mb-6">
    Scan this QR at Entry & Exit Points
  </p>

  <div className="flex justify-center mb-0">
    <QRCodeSVG
      value={qrData}
      size={300}
      level="M"
      includeMargin={false}
      style={{ width: '290px', height: '290px' }}
    />
  </div>
</div>

  )
}

export default QRCodeSection
