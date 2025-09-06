import React from 'react'
import { ArrowUpRight, ArrowDownLeft, TrendingUp } from 'lucide-react'

const ActivityFeed = () => {
  const activities = [
    {
      type: 'buy',
      coin: 'BTC',
      amount: '0.0234',
      value: '$1,240',
      time: '2 min ago',
      positive: true
    },
    {
      type: 'sell',
      coin: 'ETH',
      amount: '2.45',
      value: '$4,850',
      time: '5 min ago',
      positive: false
    },
    {
      type: 'buy',
      coin: 'ADA',
      amount: '1,250',
      value: '$485',
      time: '12 min ago',
      positive: true
    },
    {
      type: 'sell',
      coin: 'SOL',
      amount: '15.6',
      value: '$2,180',
      time: '18 min ago',
      positive: false
    },
    {
      type: 'buy',
      coin: 'DOT',
      amount: '45.2',
      value: '$320',
      time: '25 min ago',
      positive: true
    }
  ]

  const topCoins = [
    { name: 'Bitcoin', symbol: 'BTC', price: '$52,340', change: '+2.5%', positive: true },
    { name: 'Ethereum', symbol: 'ETH', price: '$3,240', change: '+1.8%', positive: true },
    { name: 'Cardano', symbol: 'ADA', price: '$0.485', change: '-0.9%', positive: false },
    { name: 'Solana', symbol: 'SOL', price: '$140', change: '+4.2%', positive: true },
  ]

  return (
    <div className="space-y-6">
      {/* Recent Activity */}
      <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  activity.positive ? 'bg-green-500/20' : 'bg-red-500/20'
                }`}>
                  {activity.positive ? 
                    <ArrowUpRight className="text-green-400" size={16} /> :
                    <ArrowDownLeft className="text-red-400" size={16} />
                  }
                </div>
                <div>
                  <p className="font-medium text-sm">{activity.type.toUpperCase()} {activity.coin}</p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-sm">{activity.amount}</p>
                <p className="text-xs text-gray-400">{activity.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Cryptocurrencies */}
      <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <h3 className="text-lg font-bold mb-4">Top Cryptocurrencies</h3>
        <div className="space-y-4">
          {topCoins.map((coin, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">{coin.symbol.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-medium text-sm">{coin.name}</p>
                  <p className="text-xs text-gray-400">{coin.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-sm">{coin.price}</p>
                <p className={`text-xs ${coin.positive ? 'text-green-400' : 'text-red-400'}`}>
                  {coin.change}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Indicator */}
      <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl">
            <TrendingUp className="text-blue-400" size={20} />
          </div>
          <h3 className="text-lg font-bold">Portfolio Performance</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Overall Growth</span>
              <span className="text-green-400">+24.8%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{width: '75%'}}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Risk Level</span>
              <span className="text-yellow-400">Medium</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full" style={{width: '60%'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActivityFeed