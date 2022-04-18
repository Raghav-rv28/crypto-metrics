import React from 'react'
import { useParams } from 'react-router-dom'

const Cryptodetails = () => {
  const {coinId} = useParams()
  return (
    <div>Cryptodetails{coinId}</div>
  )
}

export default Cryptodetails