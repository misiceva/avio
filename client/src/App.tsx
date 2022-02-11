import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { User } from './types';
import GuestApp from './guest/GuestApp';
import ClientApp from './client/ClientApp';
import AdminApp from './admin/AdminApp';

function App() {
  const [user, setUser] = useState<User | undefined>(undefined)
  if (!user) {
    return (
      <GuestApp />
    )
  }
  if (user.admin) {
    return (
      <AdminApp />
    )
  }
  return (
    <ClientApp />
  )
}

export default App;
