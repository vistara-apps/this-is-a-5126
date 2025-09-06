import React from 'react'
import { 
  Home, 
  TrendingUp, 
  Wallet, 
  Settings, 
  BarChart3, 
  Users, 
  Shield,
  HelpCircle
} from 'lucide-react'

const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: TrendingUp, label: 'Trading', active: false },
    { icon: Wallet, label: 'Wallet', active: false },
    { icon: BarChart3, label: 'Analytics', active: false },
    { icon: Users, label: 'Portfolio', active: false },
    { icon: Shield, label: 'Security', active: false },
    { icon: Settings, label: 'Settings', active: false },
    { icon: HelpCircle, label: 'Help', active: false },
  ]

  return (
    <div className="w-16 lg:w-64 bg-black/20 backdrop-blur-xl border-r border-white/10 flex flex-col">
      {/* Logo */}
      <div className="p-4 lg:p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">L</span>
          </div>
          <span className="hidden lg:block font-bold text-xl">LiquiFlow</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 lg:p-6">
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                item.active
                  ? 'bg-gradient-to-r from-purple-600/50 to-pink-600/50 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <item.icon size={20} className="flex-shrink-0" />
              <span className="hidden lg:block">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 lg:p-6 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          <div className="hidden lg:block">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-gray-400">Premium User</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar