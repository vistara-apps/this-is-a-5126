import React from 'react'
import { Search, Bell, User } from 'lucide-react'

const Header = () => {
  return (
    <header className="p-4 lg:p-6 border-b border-white/10 bg-black/20 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search cryptocurrencies..."
              className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4 ml-4">
          <button className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
            <Bell size={20} />
          </button>
          <button className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header