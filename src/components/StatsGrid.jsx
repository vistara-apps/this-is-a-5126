import React from 'react'
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react'

const StatsGrid = () => {
  const stats = [
    {
      title: 'Total Balance',
      value: '$83,466',
      change: '+12.5%',
      positive: true,
      icon: DollarSign,
      subtitle: 'USD'
    },
    {
      title: 'Active Protocols',
      value: '3273',
      change: '+8.2%',
      positive: true,
      icon: BarChart3,
      subtitle: 'DeFi'
    },
    {
      title: 'APY Rate',
      value: '6217.76%',
      change: '-2.1%',
      positive: false,
      icon: TrendingUp,
      subtitle: 'Current'
    },
    {
      title: 'Daily Volume',
      value: '$0.4M',
      change: '+15.7%',
      positive: true,
      icon: BarChart3,
      subtitle: '24h'
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <div className="flex items-start justify-between mb-4">
            <div className="p-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl">
              <stat.icon className="text-purple-400" size={20} />
            </div>
            <div className={`flex items-center gap-1 text-sm ${
              stat.positive ? 'text-green-400' : 'text-red-400'
            }`}>
              {stat.positive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              {stat.change}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold mb-1">{stat.value}</h3>
            <p className="text-gray-400 text-sm">{stat.title}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default StatsGrid