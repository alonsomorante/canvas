import React from 'react'

function Results ({ playerlives, enemylives }) {
  return (
    <div>
      {
        playerlives <= 0 && <p>Perdiste</p>
      }
      {
        enemylives <= 0 && <p>Ganaste</p>
      }
    </div>
  )
}

export default Results
