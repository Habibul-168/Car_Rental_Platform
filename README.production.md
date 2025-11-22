# RentDrive - Production Deployment Guide

## Prerequisites
- Docker & Docker Compose
- MongoDB Atlas account (recommended)
- Domain name and SSL certificate

## Environment Setup

1. **Configure Production Environment**
   ```bash
   # Update backend/.env.production with your values
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/car-rental-prod
   JWT_SECRET=your-super-secure-jwt-secret-key
   CORS_ORIGIN=https://yourdomain.com
   ```

2. **Configure Frontend Environment**
   ```bash
   # Update frontend/.env.production
   VITE_API_URL=https://yourdomain.com/api
   ```

## Deployment Options

### Option 1: Docker Compose (Recommended)
```bash
# Build and start all services
docker-compose -f docker-compose.prod.yml up -d

# Seed the database
docker-compose -f docker-compose.prod.yml exec backend npm run seed
```

### Option 2: Manual Deployment

**Backend:**
```bash
cd backend
npm install --production
npm run seed
npm start
```

**Frontend:**
```bash
cd frontend
npm install
npm run build
# Deploy dist/ folder to your web server
```

## Production Checklist

- [ ] Update all environment variables
- [ ] Configure MongoDB Atlas
- [ ] Set up SSL certificates
- [ ] Configure domain DNS
- [ ] Test all functionality
- [ ] Set up monitoring
- [ ] Configure backups

## Security Features Included

- CORS protection
- Security headers (X-Frame-Options, X-XSS-Protection)
- Environment variable protection
- Gzip compression
- Production-optimized builds

## Monitoring

Monitor these endpoints:
- Health: `GET /api/health`
- Cars: `GET /api/cars`
- Frontend: `https://yourdomain.com`

## Support

For production issues, check:
1. Docker logs: `docker-compose logs`
2. MongoDB connection
3. Environment variables
4. Network connectivity