# LiquiFlow Business Logic Documentation

## Overview

This document outlines the comprehensive business logic and requirements for the LiquiFlow cryptocurrency dashboard application. It defines the core business rules, data processing logic, and user interaction patterns that drive the application's functionality.

## Business Requirements

### Core Business Objectives
1. **Portfolio Management**: Enable users to track and manage their cryptocurrency investments
2. **Market Intelligence**: Provide real-time market data and analytics
3. **Trading Support**: Facilitate informed trading decisions through data visualization
4. **Risk Management**: Help users understand and manage investment risks
5. **User Engagement**: Create an intuitive and engaging user experience

### Target Market
- **Primary**: Active cryptocurrency traders (18-45 years)
- **Secondary**: Portfolio managers and financial advisors
- **Tertiary**: Crypto enthusiasts and institutional investors

## Data Models & Business Logic

### 1. Portfolio Management

#### Portfolio Calculation Logic
```javascript
// Total Portfolio Value Calculation
const calculatePortfolioValue = (holdings) => {
  return holdings.reduce((total, holding) => {
    return total + (holding.amount * holding.currentPrice);
  }, 0);
};

// Portfolio Performance Calculation
const calculatePerformance = (currentValue, initialValue) => {
  const change = currentValue - initialValue;
  const percentage = (change / initialValue) * 100;
  return {
    absoluteChange: change,
    percentageChange: percentage,
    isPositive: change >= 0
  };
};

// Risk Assessment Logic
const calculateRiskLevel = (portfolio) => {
  const volatilityScore = calculateVolatility(portfolio);
  const diversificationScore = calculateDiversification(portfolio);
  const concentrationRisk = calculateConcentration(portfolio);
  
  const riskScore = (volatilityScore * 0.4) + 
                   (diversificationScore * 0.3) + 
                   (concentrationRisk * 0.3);
  
  if (riskScore < 30) return 'low';
  if (riskScore < 70) return 'medium';
  return 'high';
};
```

#### Business Rules
- **Minimum Portfolio Value**: $100 for premium features
- **Maximum Holdings**: 50 different cryptocurrencies per portfolio
- **Rebalancing Threshold**: Alert when any single asset exceeds 40% of portfolio
- **Performance Tracking**: Calculate returns over 1D, 7D, 30D, 1Y periods

### 2. Market Data Processing

#### Price Data Logic
```javascript
// Price Change Calculation
const calculatePriceChange = (currentPrice, previousPrice) => {
  const change = currentPrice - previousPrice;
  const percentage = (change / previousPrice) * 100;
  return {
    absolute: change,
    percentage: percentage.toFixed(2),
    direction: change >= 0 ? 'up' : 'down'
  };
};

// Volume Analysis
const analyzeVolume = (currentVolume, averageVolume) => {
  const ratio = currentVolume / averageVolume;
  let significance = 'normal';
  
  if (ratio > 2) significance = 'high';
  else if (ratio < 0.5) significance = 'low';
  
  return {
    ratio,
    significance,
    isUnusual: ratio > 2 || ratio < 0.5
  };
};

// Market Cap Ranking
const calculateMarketCapRank = (marketCap, allMarketCaps) => {
  const sorted = allMarketCaps.sort((a, b) => b - a);
  return sorted.indexOf(marketCap) + 1;
};
```

#### Business Rules
- **Data Freshness**: Market data must be updated every 30 seconds
- **Price Alerts**: Trigger notifications for >5% price changes
- **Volume Alerts**: Notify when volume exceeds 200% of 24h average
- **Market Hours**: Display different indicators for market open/closed status

### 3. Trading Logic

#### Order Validation
```javascript
// Order Validation Logic
const validateOrder = (order, portfolio, marketData) => {
  const validations = [];
  
  // Balance Check
  if (order.type === 'buy') {
    const requiredAmount = order.quantity * marketData.currentPrice;
    if (portfolio.availableBalance < requiredAmount) {
      validations.push({
        type: 'error',
        message: 'Insufficient balance for this order'
      });
    }
  }
  
  // Minimum Order Size
  const orderValue = order.quantity * marketData.currentPrice;
  if (orderValue < 10) {
    validations.push({
      type: 'error',
      message: 'Minimum order value is $10'
    });
  }
  
  // Market Hours Check
  if (!isMarketOpen() && order.type === 'market') {
    validations.push({
      type: 'warning',
      message: 'Market order will execute when market opens'
    });
  }
  
  return validations;
};

// Fee Calculation
const calculateTradingFees = (orderValue, userTier) => {
  const feeRates = {
    basic: 0.0025,    // 0.25%
    premium: 0.0015,  // 0.15%
    vip: 0.001        // 0.10%
  };
  
  return orderValue * feeRates[userTier];
};
```

#### Business Rules
- **Minimum Order**: $10 USD equivalent
- **Maximum Order**: $100,000 USD per transaction (basic users)
- **Daily Limits**: $500,000 USD per day (premium users)
- **Fee Structure**: Tiered based on user level and volume

### 4. User Management

#### User Tier Logic
```javascript
// User Tier Calculation
const calculateUserTier = (user) => {
  const monthlyVolume = user.monthlyTradingVolume;
  const portfolioValue = user.portfolioValue;
  const accountAge = user.accountAgeInDays;
  
  if (monthlyVolume > 1000000 || portfolioValue > 500000) {
    return 'vip';
  } else if (monthlyVolume > 100000 || portfolioValue > 50000) {
    return 'premium';
  }
  return 'basic';
};

// Feature Access Control
const hasFeatureAccess = (user, feature) => {
  const featureMatrix = {
    'advanced_charts': ['premium', 'vip'],
    'api_access': ['vip'],
    'priority_support': ['premium', 'vip'],
    'custom_alerts': ['premium', 'vip'],
    'portfolio_analytics': ['premium', 'vip']
  };
  
  return featureMatrix[feature]?.includes(user.tier) || false;
};
```

#### Business Rules
- **Account Verification**: KYC required for >$10,000 transactions
- **Session Management**: 24-hour session timeout for security
- **Multi-Factor Authentication**: Required for all trading activities
- **Account Limits**: Based on verification level and user tier

### 5. Analytics & Reporting

#### Performance Metrics
```javascript
// Portfolio Analytics
const generatePortfolioAnalytics = (portfolio, timeframe) => {
  return {
    totalReturn: calculateTotalReturn(portfolio, timeframe),
    sharpeRatio: calculateSharpeRatio(portfolio, timeframe),
    maxDrawdown: calculateMaxDrawdown(portfolio, timeframe),
    volatility: calculateVolatility(portfolio, timeframe),
    beta: calculateBeta(portfolio, timeframe),
    diversificationRatio: calculateDiversification(portfolio)
  };
};

// Risk Metrics
const calculateRiskMetrics = (portfolio) => {
  return {
    valueAtRisk: calculateVaR(portfolio, 0.05), // 5% VaR
    expectedShortfall: calculateES(portfolio, 0.05),
    concentrationRisk: calculateHerfindahlIndex(portfolio),
    correlationRisk: calculateCorrelationMatrix(portfolio)
  };
};
```

#### Business Rules
- **Reporting Frequency**: Daily portfolio snapshots
- **Performance Benchmarks**: Compare against BTC, ETH, and market indices
- **Risk Reporting**: Weekly risk assessment reports
- **Tax Reporting**: Annual tax documents for realized gains/losses

### 6. Notification System

#### Alert Logic
```javascript
// Price Alert System
const checkPriceAlerts = (userAlerts, currentPrices) => {
  const triggeredAlerts = [];
  
  userAlerts.forEach(alert => {
    const currentPrice = currentPrices[alert.symbol];
    let triggered = false;
    
    switch (alert.type) {
      case 'price_above':
        triggered = currentPrice > alert.threshold;
        break;
      case 'price_below':
        triggered = currentPrice < alert.threshold;
        break;
      case 'percentage_change':
        const change = calculatePriceChange(currentPrice, alert.basePrice);
        triggered = Math.abs(change.percentage) > alert.threshold;
        break;
    }
    
    if (triggered) {
      triggeredAlerts.push({
        ...alert,
        currentPrice,
        triggeredAt: new Date()
      });
    }
  });
  
  return triggeredAlerts;
};
```

#### Business Rules
- **Alert Frequency**: Maximum 10 alerts per user per hour
- **Alert Types**: Price, volume, news, portfolio performance
- **Delivery Methods**: Email, SMS, push notifications, in-app
- **Alert Persistence**: Alerts expire after 24 hours if not acknowledged

### 7. Security & Compliance

#### Security Logic
```javascript
// Fraud Detection
const detectSuspiciousActivity = (user, transaction) => {
  const riskFactors = [];
  
  // Unusual transaction size
  if (transaction.amount > user.averageTransactionSize * 10) {
    riskFactors.push('large_transaction');
  }
  
  // Rapid succession of trades
  const recentTrades = user.getTradesInLastHour();
  if (recentTrades.length > 20) {
    riskFactors.push('high_frequency');
  }
  
  // Geographic anomaly
  if (transaction.location !== user.usualLocation) {
    riskFactors.push('location_change');
  }
  
  return {
    riskScore: riskFactors.length,
    factors: riskFactors,
    requiresReview: riskFactors.length > 2
  };
};

// Compliance Checks
const performComplianceCheck = (user, transaction) => {
  const checks = {
    amlCheck: performAMLCheck(user, transaction),
    sanctionsCheck: checkSanctionsList(user),
    jurisdictionCheck: validateJurisdiction(user.location),
    limitCheck: validateTransactionLimits(user, transaction)
  };
  
  return {
    passed: Object.values(checks).every(check => check.passed),
    details: checks
  };
};
```

#### Business Rules
- **AML Compliance**: Monitor for suspicious patterns and large transactions
- **KYC Requirements**: Identity verification for accounts >$1,000
- **Geographic Restrictions**: Comply with local regulations
- **Transaction Monitoring**: Real-time fraud detection and prevention

### 8. Data Retention & Privacy

#### Data Management
```javascript
// Data Retention Policy
const applyDataRetention = (userData) => {
  const retentionPeriods = {
    transactionData: 7 * 365, // 7 years
    personalData: 5 * 365,    // 5 years
    marketData: 2 * 365,      // 2 years
    logData: 90               // 90 days
  };
  
  Object.keys(retentionPeriods).forEach(dataType => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - retentionPeriods[dataType]);
    
    cleanupOldData(dataType, cutoffDate);
  });
};

// Privacy Controls
const applyPrivacySettings = (user, data) => {
  if (user.privacySettings.anonymizeData) {
    data = anonymizePersonalData(data);
  }
  
  if (user.privacySettings.limitDataSharing) {
    data = removeThirdPartyData(data);
  }
  
  return data;
};
```

#### Business Rules
- **Data Minimization**: Collect only necessary data
- **User Consent**: Explicit consent for data processing
- **Right to Deletion**: Users can request data deletion
- **Data Portability**: Users can export their data

## Integration Requirements

### External APIs
- **Market Data**: CoinGecko, CoinMarketCap, Binance API
- **News Feeds**: CryptoPanic, CoinDesk API
- **Blockchain Data**: Etherscan, Blockchain.info
- **Payment Processing**: Stripe, PayPal

### Third-Party Services
- **Authentication**: Auth0, Firebase Auth
- **Analytics**: Google Analytics, Mixpanel
- **Monitoring**: Sentry, DataDog
- **Communication**: SendGrid, Twilio

## Performance Requirements

### Response Times
- **Dashboard Load**: < 2 seconds
- **Chart Updates**: < 500ms
- **Trade Execution**: < 1 second
- **Search Results**: < 300ms

### Scalability
- **Concurrent Users**: 10,000 simultaneous users
- **Data Throughput**: 1M price updates per minute
- **Storage Growth**: 100GB per month
- **API Rate Limits**: 1000 requests per minute per user

## Error Handling

### Error Categories
1. **User Errors**: Invalid input, insufficient funds
2. **System Errors**: Database failures, API timeouts
3. **Network Errors**: Connection issues, service unavailable
4. **Security Errors**: Authentication failures, suspicious activity

### Error Response Strategy
```javascript
const handleError = (error, context) => {
  const errorResponse = {
    success: false,
    error: {
      code: error.code,
      message: getErrorMessage(error, context.user.language),
      timestamp: new Date().toISOString(),
      requestId: context.requestId
    }
  };
  
  // Log error for monitoring
  logError(error, context);
  
  // Notify relevant teams for critical errors
  if (error.severity === 'critical') {
    notifyOnCallTeam(error, context);
  }
  
  return errorResponse;
};
```

## Testing Strategy

### Business Logic Testing
- **Unit Tests**: Individual function testing
- **Integration Tests**: API and database interactions
- **End-to-End Tests**: Complete user workflows
- **Performance Tests**: Load and stress testing

### Test Coverage Requirements
- **Critical Paths**: 100% coverage
- **Business Logic**: 95% coverage
- **UI Components**: 80% coverage
- **Overall Application**: 85% coverage

## Monitoring & Analytics

### Key Metrics
- **User Engagement**: DAU, MAU, session duration
- **Trading Volume**: Daily/monthly trading volumes
- **Revenue Metrics**: Fees collected, subscription revenue
- **Performance Metrics**: Response times, error rates
- **Security Metrics**: Failed login attempts, suspicious activities

### Business Intelligence
- **User Behavior Analysis**: Feature usage patterns
- **Market Trend Analysis**: Popular cryptocurrencies
- **Revenue Analysis**: Fee structure optimization
- **Risk Analysis**: Portfolio risk distribution

---

**Document Version**: 1.0  
**Last Updated**: September 6, 2025  
**Next Review**: December 6, 2025
