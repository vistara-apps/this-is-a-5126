import React from 'react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <Dashboard />
      </main>
    </div>
  )
}

export default App