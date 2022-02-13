import React from 'react'
import { Route, Routes } from 'react-router'
import { User } from '../types'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'

interface Props {
  setUser: (u: User) => void
}

export default function GuestApp(props: Props) {
  return (
    <Routes>
      <Route path='register' element={<RegisterPage setUser={props.setUser} />} />
      <Route path='*' element={<LoginPage setUser={props.setUser} />} />
    </Routes>
  )
}
