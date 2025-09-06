import React, { useState } from 'react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'

const ChartSection = () => {
  const [activeChart, setActiveChart] = useState('price')

  const priceData = [
    { name: 'Jan', value: 4000, volume: 2400 },
    { name: 'Feb', value: 3000, volume: 1398 },
    { name: 'Mar', value: 2000, volume: 9800 },
    { name: 'Apr', value: 2780, volume: 3908 },
    { name: 'May', value: 1890, volume: 4800 },
    { name: 'Jun', value: 2390, volume: 3800 },
    { name: 'Jul', value: 3490, volume: 4300 },
    { name: 'Aug', value: 4200, volume: 5200 },
    { name: 'Sep', value: 3800, volume: 4100 },
    { name: 'Oct', value: 4500, volume: 5800 },
    { name: 'Nov', value: 5200, volume: 6200 },
    { name: 'Dec', value: 5800, volume: 7100 },
  ]

  const volumeData = [
    { name: 'Mon', value: 1200 },
    { name: 'Tue', value: 1900 },
    { name: 'Wed', value: 3000 },
    { name: 'Thu', value: 5000 },
    { name: 'Fri', value: 2000 },
    { name: 'Sat', value: 3000 },
    { name: 'Sun', value: 4000 },
  ]

  const chartTabs = [
    { id: 'price', label: 'Price' },
    { id: 'volume', label: 'Volume' },
    { id: 'market', label: 'Market' },
  ]

  return (
    <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold mb-1">Cryptocurrency Analysis</h2>
          <p className="text-gray-400 text-sm">Real-time market data</p>
        </div>
        
        <div className="flex bg-black/50 rounded-xl p-1">
          {chartTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveChart(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeChart === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-80">
        {activeChart === 'price' && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={priceData}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#8b5cf6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPrice)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}

        {activeChart === 'volume' && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={volumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Bar dataKey="value" fill="#ec4899" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}

        {activeChart === 'market' && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#06b6d4"
                strokeWidth={3}
                dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="volume"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={{ fill: '#f59e0b', strokeWidth: 2, r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}

export default ChartSection