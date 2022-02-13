import React from 'react'
import { Route, Routes } from 'react-router'
import ClientNavbar from './components/ClientNavbar'
import FlightsPage from './pages/FlightsPage'
import ReservationsPage from './pages/ReservationsPage'
interface Props {
  onLogout: () => void
}
export default function ClientApp(props: Props) {
  return (
    <>
      <ClientNavbar onLogout={props.onLogout} />
      <Routes>
        <Route path='/reservations' element={<ReservationsPage />} />
        <Route path='*' element={<FlightsPage />} />
      </Routes>
    </>
  )
}
