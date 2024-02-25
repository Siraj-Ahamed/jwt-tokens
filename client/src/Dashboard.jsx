import axios from 'axios'
import React, { useEffect } from 'react'

export default function Dashboard() {
  useEffect( ( ) => {
    axios.get('http://localhost:3000/dashboard')
    .then(res =>  console.log(res))
    .catch(err => console.log(err)) 
  })
  return (
    <div>Dashboard</div>
  )
}
