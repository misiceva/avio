import React from 'react'
import { Route, Routes } from 'react-router'
import AdminNavbar from './components/AdminNavbar'
import AirplanesPage from './pages/AirplanesPage'
import FlightsPage from './pages/FlightsPage'
interface Props {
  onLogout: () => void,
}
export default function AdminApp(props: Props) {
  return (
    <>
      <AdminNavbar onLogout={props.onLogout} />
      <Routes>
        <Route path='/airplanes' element={<AirplanesPage />} />
        <Route path='*' element={(<FlightsPage />)} />
      </Routes>
    </>
  )
}
