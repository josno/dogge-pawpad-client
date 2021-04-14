import React from 'react'

const OverviewCount = ({ title, value }) => {
  return (
    <div className="container">
      <span className="container-title">{title}:</span> {value}
    </div>
  )
}

export default OverviewCount
