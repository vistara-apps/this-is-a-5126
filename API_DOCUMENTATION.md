# LiquiFlow API Documentation

## Overview

This document outlines the API requirements and specifications for the LiquiFlow cryptocurrency dashboard application. The API provides real-time cryptocurrency data, user portfolio management, and trading functionality.

## Base URL

```
Production: https://api.liquiflow.com/v1
Development: https://dev-api.liquiflow.com/v1
```

## Authentication

All API requests require authentication using Bearer tokens.

```http
Authorization: Bearer <your-access-token>
```

## Endpoints

### 1. User Authentication

#### POST /auth/login
Authenticate user and return access token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "user123",
      "email": "user@example.com",
      "name": "John Doe",
      "plan": "premium"
    }
  }
}
```

#### POST /auth/refresh
Refresh access token using refresh token.

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. Portfolio Management

#### GET /portfolio/overview
Get user's portfolio overview and statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalBalance": 83466.50,
    "totalBalanceUSD": "$83,466",
    "activeProtocols": 3273,
    "apyRate": 6217.76,
    "dailyVolume": 400000,
    "dailyVolumeFormatted": "$0.4M",
    "performance": {
      "overallGrowth": 24.8,
      "riskLevel": "medium",
      "riskScore": 60
    },
    "lastUpdated": "2025-09-06T00:19:53Z"
  }
}
```

#### GET /portfolio/activities
Get user's recent trading activities.

**Query Parameters:**
- `limit` (optional): Number of activities to return (default: 20)
- `offset` (optional): Pagination offset (default: 0)

**Response:**
```json
{
  "success": true,
  "data": {
    "activities": [
      {
        "id": "activity123",
        "type": "buy",
        "coin": "BTC",
        "amount": "0.0234",
        "value": "$1,240",
        "valueUSD": 1240.00,
        "timestamp": "2025-09-06T00:17:53Z",
        "positive": true
      },
      {
        "id": "activity124",
        "type": "sell",
        "coin": "ETH",
        "amount": "2.45",
        "value": "$4,850",
        "valueUSD": 4850.00,
        "timestamp": "2025-09-06T00:14:53Z",
        "positive": false
      }
    ],
    "pagination": {
      "total": 150,
      "limit": 20,
      "offset": 0,
      "hasMore": true
    }
  }
}
```

### 3. Market Data

#### GET /market/cryptocurrencies
Get list of top cryptocurrencies with current prices.

**Query Parameters:**
- `limit` (optional): Number of cryptocurrencies to return (default: 10)
- `sort` (optional): Sort by 'market_cap', 'price', 'volume' (default: 'market_cap')

**Response:**
```json
{
  "success": true,
  "data": {
    "cryptocurrencies": [
      {
        "id": "bitcoin",
        "name": "Bitcoin",
        "symbol": "BTC",
        "price": "$52,340",
        "priceUSD": 52340.00,
        "change24h": "+2.5%",
        "change24hPercent": 2.5,
        "positive": true,
        "marketCap": 1030000000000,
        "volume24h": 25000000000,
        "lastUpdated": "2025-09-06T00:19:53Z"
      },
      {
        "id": "ethereum",
        "name": "Ethereum",
        "symbol": "ETH",
        "price": "$3,240",
        "priceUSD": 3240.00,
        "change24h": "+1.8%",
        "change24hPercent": 1.8,
        "positive": true,
        "marketCap": 390000000000,
        "volume24h": 15000000000,
        "lastUpdated": "2025-09-06T00:19:53Z"
      }
    ]
  }
}
```

#### GET /market/chart/{symbol}
Get historical price data for charts.

**Path Parameters:**
- `symbol`: Cryptocurrency symbol (e.g., 'BTC', 'ETH')

**Query Parameters:**
- `period`: Time period ('1h', '24h', '7d', '30d', '1y')
- `interval`: Data interval ('1m', '5m', '1h', '1d')

**Response:**
```json
{
  "success": true,
  "data": {
    "symbol": "BTC",
    "period": "30d",
    "interval": "1d",
    "data": [
      {
        "timestamp": "2025-08-07T00:00:00Z",
        "price": 4000,
        "volume": 2400,
        "high": 4100,
        "low": 3900,
        "open": 3950,
        "close": 4000
      },
      {
        "timestamp": "2025-08-08T00:00:00Z",
        "price": 3000,
        "volume": 1398,
        "high": 4050,
        "low": 2950,
        "open": 4000,
        "close": 3000
      }
    ]
  }
}
```

### 4. Trading Operations

#### POST /trading/order
Place a new trading order.

**Request Body:**
```json
{
  "type": "buy",
  "symbol": "BTC",
  "amount": 0.1,
  "orderType": "market",
  "price": null
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "orderId": "order123",
    "status": "pending",
    "type": "buy",
    "symbol": "BTC",
    "amount": 0.1,
    "estimatedValue": "$5,234",
    "fee": "$15.70",
    "timestamp": "2025-09-06T00:19:53Z"
  }
}
```

#### GET /trading/orders
Get user's trading orders.

**Query Parameters:**
- `status` (optional): Filter by status ('pending', 'completed', 'cancelled')
- `limit` (optional): Number of orders to return (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "orderId": "order123",
        "status": "completed",
        "type": "buy",
        "symbol": "BTC",
        "amount": 0.1,
        "executedPrice": "$52,340",
        "totalValue": "$5,234",
        "fee": "$15.70",
        "timestamp": "2025-09-06T00:19:53Z"
      }
    ]
  }
}
```

### 5. WebSocket Connections

#### Real-time Price Updates

Connect to WebSocket endpoint for real-time price updates:

```
wss://ws.liquiflow.com/v1/prices
```

**Authentication:**
Send authentication message after connection:
```json
{
  "type": "auth",
  "token": "your-access-token"
}
```

**Subscribe to Price Updates:**
```json
{
  "type": "subscribe",
  "channel": "prices",
  "symbols": ["BTC", "ETH", "ADA", "SOL"]
}
```

**Price Update Message:**
```json
{
  "type": "price_update",
  "data": {
    "symbol": "BTC",
    "price": 52340.00,
    "change24h": 2.5,
    "volume24h": 25000000000,
    "timestamp": "2025-09-06T00:19:53Z"
  }
}
```

#### Portfolio Updates

Connect to WebSocket endpoint for portfolio updates:

```
wss://ws.liquiflow.com/v1/portfolio
```

**Portfolio Update Message:**
```json
{
  "type": "portfolio_update",
  "data": {
    "totalBalance": 83466.50,
    "change": "+1.2%",
    "changeValue": 1000.50,
    "timestamp": "2025-09-06T00:19:53Z"
  }
}
```

## Error Handling

All API endpoints return errors in the following format:

```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password",
    "details": {}
  }
}
```

### Common Error Codes

- `INVALID_CREDENTIALS`: Authentication failed
- `TOKEN_EXPIRED`: Access token has expired
- `INSUFFICIENT_FUNDS`: Not enough balance for trading
- `INVALID_SYMBOL`: Cryptocurrency symbol not supported
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `MARKET_CLOSED`: Trading not available
- `VALIDATION_ERROR`: Request validation failed

## Rate Limiting

API requests are rate-limited to prevent abuse:

- **Authentication endpoints**: 5 requests per minute
- **Market data endpoints**: 100 requests per minute
- **Portfolio endpoints**: 60 requests per minute
- **Trading endpoints**: 30 requests per minute

Rate limit headers are included in responses:
```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1693958400
```

## Data Models

### User Model
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'premium' | 'enterprise';
  createdAt: string;
  lastLoginAt: string;
}
```

### Portfolio Model
```typescript
interface Portfolio {
  totalBalance: number;
  totalBalanceUSD: string;
  activeProtocols: number;
  apyRate: number;
  dailyVolume: number;
  performance: {
    overallGrowth: number;
    riskLevel: 'low' | 'medium' | 'high';
    riskScore: number;
  };
  lastUpdated: string;
}
```

### Activity Model
```typescript
interface Activity {
  id: string;
  type: 'buy' | 'sell';
  coin: string;
  amount: string;
  value: string;
  valueUSD: number;
  timestamp: string;
  positive: boolean;
}
```

### Cryptocurrency Model
```typescript
interface Cryptocurrency {
  id: string;
  name: string;
  symbol: string;
  price: string;
  priceUSD: number;
  change24h: string;
  change24hPercent: number;
  positive: boolean;
  marketCap: number;
  volume24h: number;
  lastUpdated: string;
}
```

## Security Considerations

### API Security
- All endpoints require HTTPS
- JWT tokens for authentication
- Rate limiting to prevent abuse
- Input validation and sanitization
- CORS configuration for web clients

### Data Protection
- Sensitive data encryption at rest
- PII data anonymization in logs
- Regular security audits
- Compliance with financial regulations

## Testing

### API Testing
Use the following test credentials for development:

```
Email: test@liquiflow.com
Password: TestPassword123!
```

### Mock Data
Development environment provides mock data for testing:
- Simulated real-time price updates
- Sample portfolio data
- Test trading operations (no real money)

## Support

For API support and questions:
- Email: api-support@liquiflow.com
- Documentation: https://docs.liquiflow.com
- Status Page: https://status.liquiflow.com

---

**API Version**: 1.0  
**Last Updated**: September 6, 2025  
**Next Review**: December 6, 2025
