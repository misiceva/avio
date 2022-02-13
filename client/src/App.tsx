import React, { useEffect, useState } from 'react';
import './App.css';
import { SERVER, User } from './types';
import GuestApp from './guest/GuestApp';
import ClientApp from './client/ClientApp';
import AdminApp from './admin/AdminApp';
import axios from 'axios';
axios.defaults.withCredentials = true;
function App() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true)

  const logout = async () => {
    await axios.post(SERVER + '/user/logout');
    setUser(undefined);
  }

  useEffect(() => {
    axios.post(SERVER + '/user/check').then(res => {
      setUser(res.data)
    }).finally(() => {
      setLoading(false);
    })
  }, [])

  if (loading) {
    return null;
  }

  if (!user) {
    return (
      <GuestApp setUser={setUser} />
    )
  }
  if (user.admin) {
    return (
      <AdminApp onLogout={logout} />
    )
  }
  return (
    <ClientApp onLogout={logout} />
  )
}

export default App;
