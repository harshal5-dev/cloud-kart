import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Search,
  Filter,
  Grid,
  List,
  Star,
  ShoppingCart,
  Heart,
  Eye,
  SlidersHorizontal,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Layout/Header";
import { useGetProductsInfoQuery } from "./product/productApi";

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [currentPage] = useState(1);
  const [pageSize] = useState(20);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");

  const query = searchParams.get("q") || "";

  // RTK Query for fetching products
  const {
    data: productResponse,
    error,
    isFetching,
    isLoading,
  } = useGetProductsInfoQuery(
    {
      page: currentPage,
      pageSize: pageSize,
      keyword: query,
    },
    {
      skip: !query.trim(), // Skip query if no search term
    }
  );

  // Get products from response - using 'content' array from your API structure
  const products = productResponse?.content || [];
  const loading = isFetching || isLoading;
  const totalResults = productResponse?.totalElements || 0;
  const totalPages = productResponse?.totalPages || 0;

  const getDiscountedPrice = (price, discountPercentage) => {
    return (
      parseFloat(price) -
      (parseFloat(price) * discountPercentage) / 100
    ).toFixed(2);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ q: searchTerm });
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background pt-6">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="text-muted-foreground">
                  Searching for products...
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pt-6">
        <div className="container mx-auto px-4 py-6">
          {/* Search Header */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Search Results
                </h1>
                <p className="text-muted-foreground">
                  {totalResults} results found for "{query}"
                  {totalPages > 1 && (
                    <span className="ml-2 text-sm">
                      (Page {currentPage} of {totalPages})
                    </span>
                  )}
                </p>
              </div>

              {/* Mobile Search Bar */}
              <form onSubmit={handleSearchSubmit} className="lg:hidden">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4"
                  />
                </div>
              </form>
            </div>

            {/* Filters and View Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Button variant="outline" size="sm">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  Sort by: Relevance
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">View:</span>
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    className="rounded-r-none"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    className="rounded-l-none"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          {error && (
            <div className="text-center py-8">
              <p className="text-red-500 mb-4">
                Error:{" "}
                {error?.data?.message ||
                  error?.message ||
                  "Failed to load products"}
              </p>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
                className="mt-2"
              >
                Try Again
              </Button>
            </div>
          )}

          <div
            className={`${
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }`}
          >
            {products.map((product) => (
              <Card
                key={product.id || product.sku}
                className={`group hover:shadow-lg transition-all duration-300 ${
                  viewMode === "list" ? "overflow-hidden" : ""
                }`}
              >
                <CardContent
                  className={`p-0 ${viewMode === "list" ? "flex" : ""}`}
                >
                  {/* Product Image */}
                  <div
                    className={`${
                      viewMode === "list"
                        ? "w-48 flex-shrink-0"
                        : "aspect-square"
                    } overflow-hidden ${
                      viewMode === "grid" ? "rounded-t-lg" : ""
                    } bg-muted`}
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = `data:image/svg+xml,${encodeURIComponent(
                          '<svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="300" fill="#f1f5f9"/><path d="M150 100c-27.614 0-50 22.386-50 50s22.386 50 50 50 50-22.386 50-50-22.386-50-50-50zm0 83.333c-18.409 0-33.333-14.924-33.333-33.333s14.924-33.333 33.333-33.333 33.333 14.924 33.333 33.333-14.924 33.333-33.333 33.333z" fill="#94a3b8"/></svg>'
                        )}`;
                      }}
                    />
                  </div>

                  {/* Product Details */}
                  <div
                    className={`${
                      viewMode === "list" ? "flex-1" : ""
                    } p-4 space-y-3`}
                  >
                    {/* Badges */}
                    <div className="flex items-center space-x-2">
                      {product.featured && (
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs">
                          Featured
                        </Badge>
                      )}
                      {product.discountPercentage > 0 && (
                        <Badge className="bg-red-500 text-white text-xs">
                          -{Math.round(product.discountPercentage)}% OFF
                        </Badge>
                      )}
                    </div>

                    {/* Title and Brand */}
                    <div>
                      <Link
                        to={`/products/${product.sku}`}
                        className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-2"
                      >
                        {product.title}
                      </Link>
                      <div className="text-sm text-muted-foreground mt-1 space-x-2">
                        <span>{product.brand}</span>
                        {product.categoryName && (
                          <>
                            <span>•</span>
                            <span>{product.categoryName}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Description - List view only */}
                    {viewMode === "list" && (
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {product.description}
                      </p>
                    )}

                    {/* Rating */}
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {product.averageRating}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          ({product.totalReviews || 0} reviews)
                        </span>
                      </div>
                      {product.availabilityStatus === "IN_STOCK" && (
                        <Badge
                          variant="outline"
                          className="text-xs text-green-600 border-green-200"
                        >
                          In Stock
                        </Badge>
                      )}
                    </div>

                    {/* Price and Actions */}
                    <div
                      className={`flex ${
                        viewMode === "list"
                          ? "flex-col space-y-3"
                          : "items-center justify-between"
                      }`}
                    >
                      <div>
                        {product.discountPercentage > 0 ? (
                          <div className="space-y-1">
                            <span className="text-xl font-bold text-primary">
                              $
                              {getDiscountedPrice(
                                product.price,
                                product.discountPercentage
                              )}
                            </span>
                            <div className="text-sm text-muted-foreground line-through">
                              ${product.price}
                            </div>
                          </div>
                        ) : (
                          <span className="text-xl font-bold text-primary">
                            ${product.price}
                          </span>
                        )}
                      </div>

                      <div
                        className={`flex space-x-2 ${
                          viewMode === "list" ? "self-start" : ""
                        }`}
                      >
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-primary to-chart-2"
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                        <Button variant="outline" size="sm">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {!loading && products.length === 0 && (
            <div className="text-center py-16">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h2 className="text-2xl font-semibold mb-2">No products found</h2>
              <p className="text-muted-foreground mb-6">
                Try searching with different keywords or browse our categories
              </p>
              <div className="flex justify-center space-x-4">
                <Link to="/categories">
                  <Button variant="outline">Browse Categories</Button>
                </Link>
                <Link to="/">
                  <Button>Back to Home</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchResults;
