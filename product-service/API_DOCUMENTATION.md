# Cloud Kart Product Service - API Documentation

## Overview
This document provides a comprehensive overview of all the APIs available in the Cloud Kart Product Service, designed to support a modern e-commerce application.

## Base URL
```
http://localhost:8080/api/v1
```

## API Endpoints

### 1. Product Detail APIs (`/products`)

#### Get Product Details with Images and Reviews
```http
GET /products/{productId}/details
```
**Description**: Fetches detailed product information including images and reviews (matches your SQL query structure)

**Response**: `ProductDetailResponseDto`
- Complete product information
- Product dimensions
- List of image URLs
- List of approved reviews
- Warranty, shipping, and return policy information

#### Get Product Images
```http
GET /products/{productId}/images
```
**Description**: Fetches all images for a specific product

#### Get Product Reviews
```http
GET /products/{productId}/reviews
```
**Description**: Fetches all approved reviews for a specific product

### 2. Product Search & Filter APIs (`/search`)

#### Advanced Product Search
```http
GET /search/products
```
**Parameters**:
- `query` (optional): Search term
- `category` (optional): Category filter
- `brand` (optional): Brand filter
- `minPrice` (optional): Minimum price filter
- `maxPrice` (optional): Maximum price filter
- `minRating` (optional): Minimum rating filter
- `inStock` (optional): Stock availability filter
- `featured` (optional): Featured products filter
- `page` (default: 0): Page number
- `size` (default: 12): Page size
- `sortBy` (default: "title"): Sort field
- `sortDir` (default: "asc"): Sort direction

#### Get Featured Products
```http
GET /search/featured?limit=8
```

#### Get New Arrivals
```http
GET /search/new-arrivals?limit=8
```

#### Get Best Sellers
```http
GET /search/best-sellers?limit=8
```

### 3. Public Product APIs (`/products`)

#### Search Products with Pagination
```http
GET /products
```
**Parameters**: Same as advanced search
**Response**: `PagedResDto<ProductResDto>` (resolves the PageImpl warning)

#### Get Landing Page Products
```http
GET /products/landing?type={type}&limit={limit}
```
**Types**: "featured", "new-arrivals", "best-sellers"

### 4. Category APIs (`/categories`)

#### Get All Categories
```http
GET /categories
```
**Description**: Fetches all available categories

#### Get Category by Slug
```http
GET /categories/{slug}
```
**Description**: Fetches category details by slug

#### Get Products by Category (Simple)
```http
GET /categories/{slug}/products
```
**Description**: Fetches all products in a category (simple list)

#### Get Products by Category (Paginated)
```http
GET /categories/{slug}/products/paginated
```
**Description**: Fetches products in a category with pagination and filtering
**Parameters**: Similar to product search

### 5. Product Review APIs (`/reviews`)

#### Submit Product Review
```http
POST /reviews
```
**Body**: `ProductReviewCreateDto`
```json
{
  "productId": "uuid",
  "rating": 5,
  "comment": "Great product!",
  "reviewerName": "John Doe",
  "reviewerEmail": "john@example.com"
}
```

### 6. Admin Product APIs (`/admin/products`)

#### Admin Product Search
```http
GET /admin/products
```
**Authentication**: Required (Bearer Token)
**Description**: Same as public search but with admin privileges

#### Create Product
```http
POST /admin/products
```

#### Update Product
```http
PUT /admin/products/{productId}
```

#### Delete Product
```http
DELETE /admin/products/{productId}
```

## Key Features Implemented

### 1. PageImpl Warning Resolution ✅
- Created `PagedResDto` for stable JSON structure
- Updated all controllers to use `PagedResDto` instead of `Page`
- Implemented `CommonMapper` for Page to DTO conversion

### 2. Complex Product Detail Query ✅
- Implemented your exact SQL query requirement
- Created `ProductDetailRepository` with native queries
- Supports fetching product with images and reviews in optimized way

### 3. Modern API Design ✅
- RESTful endpoints
- Comprehensive error handling
- Swagger/OpenAPI documentation
- Validation with Jakarta validation
- Proper HTTP status codes

### 4. E-commerce Essential Features ✅
- Product search and filtering
- Category-based browsing
- Product reviews and ratings
- Featured products, new arrivals, best sellers
- Image management
- Stock management
- Admin CRUD operations

## Data Models

### ProductDetailResponseDto
```json
{
  "id": "uuid",
  "title": "Product Title",
  "description": "Product Description", 
  "category": "electronics",
  "price": 999.99,
  "discountPercentage": 10.0,
  "rating": 4.5,
  "stock": 67,
  "brand": "Apple",
  "sku": "SKU101",
  "weight": 0.5,
  "dimensions": {
    "width": 10.5,
    "height": 15.2,
    "depth": 8.3
  },
  "warrantyInformation": "1 year warranty",
  "shippingInformation": "Free shipping",
  "availabilityStatus": "IN_STOCK",
  "returnPolicy": "30-day return",
  "minimumOrderQuantity": 1,
  "thumbnail": "https://...",
  "images": ["url1", "url2"],
  "reviews": [...]
}
```

### PagedResDto
```json
{
  "content": [...],
  "currentPage": 0,
  "totalPages": 10,
  "totalElements": 100,
  "pageSize": 12,
  "last": false,
  "first": true
}
```

## Next Steps
1. **Authentication**: Implement JWT-based authentication for admin APIs
2. **Caching**: Add Redis caching for frequently accessed data
3. **Search Enhancement**: Implement Elasticsearch for advanced search
4. **Image Upload**: Add file upload functionality for product images
5. **Inventory Management**: Add real-time inventory tracking
6. **Recommendations**: Add product recommendation APIs

## Testing
All APIs can be tested using:
- Swagger UI: `http://localhost:8080/swagger-ui.html`
- Postman collections
- Integration tests
