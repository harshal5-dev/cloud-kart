# 🛒 Cloud Kart - E-commerce Microservices Platform

[![Java](https://img.shields.io/badge/Java-17+-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Spring Cloud](https://img.shields.io/badge/Spring%20Cloud-2023.x-blue.svg)](https://spring.io/projects/spring-cloud)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue.svg)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Supported-blue.svg)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> A modern, scalable e-commerce platform built with Spring Boot microservices architecture, demonstrating enterprise-level development practices and cloud-native design patterns.

## 🚀 Project Overview

Cloud Kart is a comprehensive e-commerce backend system designed using microservices architecture. This project showcases modern Spring Boot development practices, distributed system design, and cloud-native technologies suitable for enterprise-level applications.

### ✨ Key Features

- **Microservices Architecture** - 11 independent, scalable services
- **Service Discovery** - Eureka-based service registration and discovery
- **API Gateway** - Centralized routing with Spring Cloud Gateway
- **Configuration Management** - Externalized configuration with Spring Cloud Config
- **Security** - JWT-based authentication and role-based authorization
- **Message-Driven Architecture** - Asynchronous communication with RabbitMQ/Kafka
- **Distributed Tracing** - Request tracking across services
- **Health Monitoring** - Comprehensive health checks and metrics
- **Database Per Service** - Independent data management
- **Containerization** - Docker support for all services

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client Apps   │    │   Admin Panel   │    │  Mobile Apps    │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   API Gateway   │
                    │    (Port 8080)  │
                    └─────────┬───────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
┌───────▼───────┐    ┌────────▼────────┐    ┌───────▼───────┐
│ Eureka Server │    │  Config Server  │    │   Services    │
│  (Port 8761)  │    │  (Port 8888)    │    │   Cluster     │
└───────────────┘    └─────────────────┘    └───────────────┘
```

### 🔧 Microservices

| Service | Port | Description |
|---------|------|-------------|
| **API Gateway** | 8080 | Entry point, routing, authentication |
| **Eureka Server** | 8761 | Service discovery and registration |
| **Config Server** | 5555 | Centralized configuration management |
| **User Service** | 8081 | User management and authentication |
| **Product Service** | 8082 | Product catalog management |
| **Inventory Service** | 8083 | Stock and inventory management |
| **Cart Service** | 8084 | Shopping cart operations |
| **Order Service** | 8085 | Order processing and management |
| **Payment Service** | 8086 | Payment processing |
| **Notification Service** | 8087 | Email/SMS notifications |
| **Review Service** | 8088 | Product reviews and ratings |

## 🛠️ Technology Stack

### Backend Technologies
- **Java 17+** - Programming language
- **Spring Boot 3.x** - Application framework
- **Spring Cloud 2023.x** - Microservices framework
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Data persistence
- **Maven** - Dependency management

### Infrastructure
- **PostgreSQL** - Primary database
- **Redis** - Caching and session management
- **RabbitMQ/Apache Kafka** - Message broker
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

### Monitoring & Observability
- **Spring Boot Actuator** - Health monitoring
- **Micrometer** - Metrics collection
- **Prometheus** - Metrics storage
- **Grafana** - Metrics visualization
- **Zipkin** - Distributed tracing
- **ELK Stack** - Centralized logging

## 🚦 Prerequisites

Before running this project, ensure you have the following installed:

- **Java 17+** ([Download](https://adoptium.net/))
- **Maven 3.8+** ([Download](https://maven.apache.org/download.cgi))
- **Docker & Docker Compose** ([Download](https://www.docker.com/get-started))
- **PostgreSQL 15+** ([Download](https://www.postgresql.org/download/))
- **Git** ([Download](https://git-scm.com/downloads))

## 🏁 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/harshal5-dev/cloud-kart.git
cd cloud-kart
```

### 2. Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Update environment variables in .env file
nano .env
```

### 3. Database Setup
```bash
# Start PostgreSQL with Docker
docker run --name postgres-db \
  -e POSTGRES_DB=cloudkart \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  -d postgres:15

# Or use Docker Compose
docker-compose up -d postgres redis rabbitmq
```

### 4. Build All Services
```bash
# Build all microservices
mvn clean install

# Or build specific service
cd user-service
mvn clean install
```

### 5. Start Services

#### Option A: Docker Compose (Recommended)
```bash
# Start all services
docker-compose up -d

# Check services status
docker-compose ps

# View logs
docker-compose logs -f [service-name]
```

#### Option B: Manual Startup
```bash
# Start in order:
# 1. Eureka Server
cd eureka-server && java -jar target/eureka-server-*.jar &

# 2. Config Server
cd config-server && java -jar target/config-server-*.jar &

# 3. API Gateway
cd api-gateway && java -jar target/api-gateway-*.jar &

# 4. Business Services
cd user-service && java -jar target/user-service-*.jar &
cd product-service && java -jar target/product-service-*.jar &
# ... continue for other services
```

### 6. Verify Setup
```bash
# Check Eureka Dashboard
curl http://localhost:8761

# Check API Gateway health
curl http://localhost:8080/actuator/health

# Test API endpoint
curl -X GET http://localhost:8080/api/v1/products
```

## 📁 Project Structure

```
cloud-kart/
├── 📁 api-gateway/             # API Gateway service
├── 📁 eureka-server/           # Service discovery
├── 📁 config-server/           # Configuration server
├── 📁 user-service/            # User management
├── 📁 product-service/         # Product catalog
├── 📁 inventory-service/       # Inventory management
├── 📁 cart-service/            # Shopping cart
├── 📁 order-service/           # Order processing
├── 📁 payment-service/         # Payment processing
├── 📁 notification-service/    # Notifications
├── 📁 review-service/          # Product reviews
├── 📁 config-repo/             # Configuration files
├── 📁 docker/                  # Docker configurations
├── 📁 docs/                    # Documentation
├── 📁 scripts/                 # Utility scripts
├── 🐳 docker-compose.yml       # Multi-container setup
├── 🔧 .env.example             # Environment template
├── 📋 pom.xml                  # Root Maven configuration
└── 📖 README.md               # Project documentation
```

## 🔌 API Documentation

### Core Endpoints

#### Authentication
```bash
# User Registration
POST /api/v1/auth/register
Content-Type: application/json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securePassword123",
  "firstName": "John",
  "lastName": "Doe"
}

# User Login
POST /api/v1/auth/login
Content-Type: application/json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Products
```bash
# Get all products
GET /api/v1/products?page=0&size=10

# Get product by ID
GET /api/v1/products/{productId}

# Create product (Admin only)
POST /api/v1/products
Authorization: Bearer {jwt-token}
Content-Type: application/json
{
  "name": "iPhone 15 Pro",
  "description": "Latest iPhone model",
  "price": 999.99,
  "categoryId": 1,
  "sku": "IPH15PRO001"
}
```

#### Cart Operations
```bash
# Add item to cart
POST /api/v1/cart/items
Authorization: Bearer {jwt-token}
Content-Type: application/json
{
  "productId": 1,
  "quantity": 2
}

# Get user cart
GET /api/v1/cart
Authorization: Bearer {jwt-token}
```

#### Orders
```bash
# Create order
POST /api/v1/orders
Authorization: Bearer {jwt-token}
Content-Type: application/json
{
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001"
  }
}

# Get order history
GET /api/v1/orders
Authorization: Bearer {jwt-token}
```

### Swagger Documentation
- **API Gateway Swagger**: http://localhost:8080/swagger-ui.html
- **Individual Service Docs**: http://localhost:{port}/swagger-ui.html

## 🔧 Configuration

### Environment Variables
```bash
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cloudkart
DB_USERNAME=admin
DB_PASSWORD=password

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT Configuration
JWT_SECRET=your-secret-key
JWT_EXPIRATION=86400000

# RabbitMQ Configuration
RABBITMQ_HOST=localhost
RABBITMQ_PORT=5672
RABBITMQ_USERNAME=guest
RABBITMQ_PASSWORD=guest
```

### Service Configuration
Each service can be configured via `application.yml` files in the `config-repo/` directory:

```yaml
# Example: user-service.yml
server:
  port: 8081

spring:
  datasource:
    url: jdbc:postgresql://${DB_HOST}:${DB_PORT}/${DB_NAME}
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}
  
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: false

eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/
```

## 🧪 Testing

### Running Tests
```bash
# Run all tests
mvn test

# Run tests for specific service
cd user-service && mvn test

# Run integration tests
mvn test -Dtest=*IntegrationTest

# Generate test coverage report
mvn jacoco:report
```

### Test Categories
- **Unit Tests** - Individual component testing
- **Integration Tests** - Service integration testing
- **Contract Tests** - API contract validation
- **End-to-End Tests** - Complete workflow testing

## 📊 Monitoring

### Health Checks
- **Eureka Dashboard**: http://localhost:8761
- **Gateway Health**: http://localhost:8080/actuator/health
- **Service Health**: http://localhost:{port}/actuator/health

### Metrics & Monitoring
- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3000
- **Zipkin**: http://localhost:9411

### Logging
```bash
# View service logs
docker-compose logs -f user-service

# View all logs
docker-compose logs -f

# Access ELK Stack
# Kibana: http://localhost:5601
```

## 🚀 Deployment

### Docker Deployment
```bash
# Build and deploy all services
docker-compose up --build -d

# Scale specific service
docker-compose up --scale user-service=3 -d

# Update specific service
docker-compose up --build -d user-service
```

### Production Deployment
```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Deploy to production
docker-compose -f docker-compose.prod.yml up -d
```

## 🛡️ Security

### Authentication Flow
1. User registers/logs in via `/auth` endpoints
2. JWT token issued with user claims
3. Token validated at API Gateway
4. Authenticated requests forwarded to services

### Security Features
- **JWT Authentication** - Stateless authentication
- **Role-based Authorization** - CUSTOMER/ADMIN roles
- **API Rate Limiting** - Request throttling
- **CORS Configuration** - Cross-origin protection
- **Input Validation** - Request payload validation

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

### Development Guidelines
- Follow Java coding standards
- Write comprehensive tests
- Update documentation
- Use conventional commit messages

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Harshal** - *Initial work* - [@harshal5-dev](https://github.com/harshal5-dev)

## 🙏 Acknowledgments

- Spring Boot and Spring Cloud communities
- Microservices design patterns and best practices
- Open source contributors

## 📞 Support

For support and questions:
- **GitHub Issues**: [Create an issue](https://github.com/harshal5-dev/cloud-kart/issues)
- **Email**: your-email@example.com
- **Documentation**: [Project Wiki](https://github.com/harshal5-dev/cloud-kart/wiki)

---

⭐ **Star this repository if you find it helpful!**

## 🗺️ Roadmap

- [ ] Implement OAuth2 integration
- [ ] Add caching layer with Redis
- [ ] Implement event sourcing
- [ ] Add GraphQL API support
- [ ] Mobile app development
- [ ] Kubernetes deployment
- [ ] CI/CD pipeline setup
- [ ] Performance optimization

---

**Built with ❤️ by [Harshal](https://github.com/harshal5-dev)**
