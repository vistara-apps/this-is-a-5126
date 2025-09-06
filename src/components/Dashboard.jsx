import React from 'react'
import Header from './Header'
import StatsGrid from './StatsGrid'
import ChartSection from './ChartSection'
import ActivityFeed from './ActivityFeed'

const Dashboard = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      
      <div className="flex-1 overflow-auto">
        <div className="p-4 lg:p-6 space-y-6">
          {/* Stats Grid */}
          <StatsGrid />
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Chart Section - Takes 2 columns on xl screens */}
            <div className="xl:col-span-2">
              <ChartSection />
            </div>
            
            {/* Activity Feed - Takes 1 column on xl screens */}
            <div className="xl:col-span-1">
              <ActivityFeed />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
