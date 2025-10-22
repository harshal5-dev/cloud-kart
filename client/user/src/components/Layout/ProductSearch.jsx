import { Search, X, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ProductSearchResults from "./ProductSearchResults";
import { useGetProductsInfoQuery } from "../../pages/product/productApi";

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // RTK Query for fetching products
  const {
    data: productResponse,
    error,
    isFetching,
  } = useGetProductsInfoQuery(
    {
      page: 1,
      pageSize: 8,
      keyword: debouncedSearchTerm,
    },
    {
      skip: !debouncedSearchTerm.trim(), // Skip query if no search term
    }
  );

  // Debounce search term
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Show results when we have data
  useEffect(() => {
    if (
      debouncedSearchTerm.trim() &&
      (productResponse?.content?.length > 0 || error)
    ) {
      setShowResults(true);
    } else if (!debouncedSearchTerm.trim()) {
      setShowResults(false);
    }
  }, [productResponse, debouncedSearchTerm, error]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle search input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Clear results if search is empty
    if (!value.trim()) {
      setShowResults(false);
    }
  };

  // Handle search submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Navigate to full search results page
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setShowResults(false);
    }
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
    setDebouncedSearchTerm("");
    setShowResults(false);
  };

  // Get products from response - using 'content' array from your API structure
  const products = productResponse?.content || [];
  const loading = isFetching;

  return (
    <div className="w-full relative" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />

        <Input
          type="search"
          placeholder="Search for products, brands, categories..."
          className="pl-10 pr-12 w-full bg-background/80 backdrop-blur-sm border-border/40 focus:border-primary focus:bg-background focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none transition-all duration-200 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none h-9"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => searchTerm && setShowResults(true)}
        />

        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          {loading && (
            <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
          )}

          {searchTerm && !loading && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-5 w-5 p-0 hover:bg-muted"
              onClick={clearSearch}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      </form>

      {/* Search Results Dropdown */}
      {showResults && (
        <ProductSearchResults
          products={products}
          searchTerm={searchTerm}
          loading={loading}
          error={error}
          onClose={() => setShowResults(false)}
          onProductSelect={() => setShowResults(false)}
        />
      )}
    </div>
  );
};

export default ProductSearch;
