import {
  ShoppingCart,
  Star,
  Eye,
  ArrowRight,
  Package,
  Search,
  AlertCircle,
} from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { Link } from "react-router-dom";

const ProductSearchResults = ({
  products,
  searchTerm,
  loading,
  error,
  onClose,
  onProductSelect,
}) => {
  // Calculate discounted price
  const getDiscountedPrice = (price, discountPercentage) => {
    return (price - (price * discountPercentage) / 100).toFixed(2);
  };

  // Format rating display
  const formatRating = (rating) => {
    return Math.round(rating * 10) / 10;
  };

  return (
    <Card className="absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-md border shadow-2xl rounded-lg overflow-hidden z-50 max-h-[500px] overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">
              Search results for "{searchTerm}"
            </span>
          </div>
          {products.length > 0 && (
            <Link
              to={`/search?q=${encodeURIComponent(searchTerm)}`}
              onClick={onClose}
              className="text-xs text-primary hover:text-primary/80 font-medium flex items-center space-x-1"
            >
              <span>View all</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          )}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="p-8 text-center">
          <div className="inline-flex items-center space-x-3 text-muted-foreground">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            <span className="text-sm">Searching for products...</span>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="p-6 text-center">
          <div className="inline-flex flex-col items-center space-y-2 text-muted-foreground">
            <AlertCircle className="h-8 w-8 text-red-400" />
            <span className="text-sm">Failed to load search results</span>
            <span className="text-xs">Please try again later</span>
          </div>
        </div>
      )}

      {/* No Results */}
      {!loading && !error && products.length === 0 && searchTerm && (
        <div className="p-8 text-center">
          <div className="inline-flex flex-col items-center space-y-3 text-muted-foreground">
            <Package className="h-12 w-12 opacity-50" />
            <div className="space-y-1">
              <p className="text-sm font-medium">No products found</p>
              <p className="text-xs">Try searching with different keywords</p>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {!loading && !error && products.length > 0 && (
        <div className="divide-y">
          {products.map((product) => (
            <Link
              key={product.id || product.sku}
              to={`/products/${product.sku}`}
              onClick={onProductSelect}
              className="block hover:bg-muted/50 transition-colors duration-200"
            >
              <div className="p-4">
                <div className="flex items-start space-x-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden border">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = `data:image/svg+xml,${encodeURIComponent(
                            '<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="64" height="64" fill="#f1f5f9"/><path d="M32 20c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" fill="#94a3b8"/></svg>'
                          )}`;
                        }}
                      />
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground truncate pr-2">
                          {product.title}
                        </h4>

                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {product.description}
                        </p>

                        {/* Brand and Category */}
                        <div className="flex items-center space-x-2 mt-2">
                          {product.brand && (
                            <Badge
                              variant="secondary"
                              className="text-xs px-2 py-0.5"
                            >
                              {product.brand}
                            </Badge>
                          )}
                          {product.categoryName && (
                            <Badge
                              variant="outline"
                              className="text-xs px-2 py-0.5 border-primary/20 text-primary"
                            >
                              {product.categoryName}
                            </Badge>
                          )}
                          {product.featured && (
                            <Badge className="text-xs px-2 py-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                              Featured
                            </Badge>
                          )}
                        </div>

                        {/* Rating and Reviews */}
                        <div className="flex items-center space-x-3 mt-2">
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-medium">
                              {formatRating(product.averageRating)}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              ({product.totalReviews || 0})
                            </span>
                          </div>

                          {product.availabilityStatus === "IN_STOCK" && (
                            <Badge
                              variant="outline"
                              className="text-xs px-2 py-0.5 text-green-600 border-green-200"
                            >
                              In Stock
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Price and Actions */}
                      <div className="flex flex-col items-end space-y-2 ml-4">
                        <div className="text-right">
                          {product.discountPercentage > 0 ? (
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <span className="text-lg font-bold text-primary">
                                  $
                                  {getDiscountedPrice(
                                    product.price,
                                    product.discountPercentage
                                  )}
                                </span>
                                <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5">
                                  -{Math.round(product.discountPercentage)}%
                                </Badge>
                              </div>
                              <span className="text-sm text-muted-foreground line-through">
                                ${product.price}
                              </span>
                            </div>
                          ) : (
                            <span className="text-lg font-bold text-primary">
                              ${product.price}
                            </span>
                          )}
                        </div>

                        {/* Quick Actions */}
                        <div className="flex space-x-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 w-7 p-0 hover:bg-primary hover:text-white"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              // Add to cart logic
                              console.log("Add to cart:", product.title);
                            }}
                          >
                            <ShoppingCart className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 w-7 p-0 hover:bg-muted"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              // Quick view logic
                              console.log("Quick view:", product.title);
                            }}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Footer */}
      {!loading && !error && products.length > 0 && (
        <div className="p-3 bg-muted/30 border-t">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Showing {products.length} results</span>
            <Link
              to={`/search?q=${encodeURIComponent(searchTerm)}`}
              onClick={onClose}
              className="text-primary hover:text-primary/80 font-medium flex items-center space-x-1"
            >
              <span>View all results</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ProductSearchResults;
