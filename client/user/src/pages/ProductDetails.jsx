import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  ArrowLeft,
  Plus,
  Minus,
  Truck,
  Shield,
  RefreshCw,
  Package,
  Check,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Layout/Header";
import "../styles/ProductDetails.css";

const ProductDetails = () => {
  const { sku } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        // Replace with your actual API endpoint
        const response = await fetch(
          `https://api.cloudkart.com/products/${sku}`
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.message);

        // Mock data for demo - based on your API structure
        const mockProduct = {
          title: "iPhone X",
          categorySlug: "smartphones",
          categoryName: "Smartphones",
          description:
            "The iPhone X is a flagship smartphone featuring a bezel-less OLED display, facial recognition technology (Face ID), and impressive performance. It represents a milestone in iPhone design and innovation.",
          price: 899.99,
          stock: 37,
          brand: "Apple",
          sku: "SMA-APP-IPH-124",
          featured: false,
          totalSales: 0,
          averageRating: 4.5,
          discountPercentage: 19.59,
          weight: 1.0,
          width: 21.88,
          height: 24.19,
          depth: 14.19,
          minimumOrderQuantity: 2,
          availabilityStatus: "IN_STOCK",
          shippingDetails: "Ships in 3-5 business days",
          warrantyDetails: "3 months warranty",
          returnPolicy: "7 days return policy",
          thumbnail:
            "https://cdn.dummyjson.com/product-images/smartphones/iphone-x/thumbnail.webp",
          productImages: [
            {
              imageUrl:
                "https://cdn.dummyjson.com/product-images/smartphones/iphone-x/thumbnail.webp",
              altText: "iPhone X - Apple - Main product image",
              sortOrder: 1,
            },
            {
              imageUrl:
                "https://cdn.dummyjson.com/product-images/smartphones/iphone-x/1.webp",
              altText: "iPhone X - Apple - Product image 2",
              sortOrder: 2,
            },
            {
              imageUrl:
                "https://cdn.dummyjson.com/product-images/smartphones/iphone-x/2.webp",
              altText: "iPhone X - Apple - Product image 3",
              sortOrder: 3,
            },
            {
              imageUrl:
                "https://cdn.dummyjson.com/product-images/smartphones/iphone-x/3.webp",
              altText: "iPhone X - Apple - Product image 4",
              sortOrder: 4,
            },
          ],
        };
        setProduct(mockProduct);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [sku]);

  const getDiscountedPrice = (price, discountPercentage) => {
    return (price - (price * discountPercentage) / 100).toFixed(2);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    setAddingToCart(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Add your cart logic here
    console.log(`Added ${quantity} ${product.title} to cart`);
    setAddingToCart(false);
  };

  const handleToggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
    // Add your wishlist logic here
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="text-muted-foreground">
                  Loading product details...
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error && !product) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-background pt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-16">
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Product Not Found</h2>
              <p className="text-muted-foreground mb-6">
                The product you're looking for doesn't exist or has been
                removed.
              </p>
              <div className="space-x-4">
                <Button variant="outline" onClick={() => navigate(-1)}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go Back
                </Button>
                <Link to="/search">
                  <Button>Browse Products</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const currentImage = product.productImages?.[selectedImageIndex] || {
    imageUrl: product.thumbnail,
    altText: product.title,
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background pt-1 pb-8">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              to={`/categories/${product.categorySlug}`}
              className="hover:text-primary transition-colors"
            >
              {product.categoryName}
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium truncate">
              {product.title}
            </span>
          </div>

          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 -ml-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Product Images */}
            <div className="space-y-3 order-1 lg:order-1">
              {/* Main Image */}
              <div className="relative aspect-square bg-white rounded-lg overflow-hidden border shadow-sm">
                <img
                  src={currentImage.imageUrl}
                  alt={currentImage.altText}
                  className="w-full h-full object-contain p-3"
                  onError={(e) => {
                    e.target.src = `data:image/svg+xml,${encodeURIComponent(
                      '<svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="400" fill="#f1f5f9"/><path d="M200 150c-27.614 0-50 22.386-50 50s22.386 50 50 50 50-22.386 50-50-22.386-50-50-50zm0 83.333c-18.409 0-33.333-14.924-33.333-33.333s14.924-33.333 33.333-33.333 33.333 14.924 33.333 33.333-14.924 33.333-33.333 33.333z" fill="#94a3b8"/></svg>'
                    )}`;
                  }}
                />

                {/* Image Navigation Arrows */}
                {product.productImages?.length > 1 && (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                      onClick={() =>
                        setSelectedImageIndex(
                          selectedImageIndex === 0
                            ? product.productImages.length - 1
                            : selectedImageIndex - 1
                        )
                      }
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                      onClick={() =>
                        setSelectedImageIndex(
                          selectedImageIndex ===
                            product.productImages.length - 1
                            ? 0
                            : selectedImageIndex + 1
                        )
                      }
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 space-y-2">
                  {product.featured && (
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                      Featured
                    </Badge>
                  )}
                  {product.discountPercentage > 0 && (
                    <Badge className="bg-red-500 text-white">
                      -{Math.round(product.discountPercentage)}% OFF
                    </Badge>
                  )}
                </div>
              </div>

              {/* Thumbnail Images */}
              {product.productImages?.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                  {product.productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-md overflow-hidden border-2 transition-all duration-200 bg-white ${
                        selectedImageIndex === index
                          ? "border-primary ring-2 ring-primary/20 shadow-md"
                          : "border-gray-200 hover:border-primary/50 hover:shadow-sm"
                      }`}
                    >
                      <img
                        src={image.imageUrl}
                        alt={image.altText}
                        className="w-full h-full object-contain p-1"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-4 order-2 lg:order-2 lg:pl-2">
              {/* Title and Rating */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {product.brand}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {product.categoryName}
                  </Badge>
                  <Badge className="text-xs bg-gray-100 text-gray-700">
                    SKU: {product.sku}
                  </Badge>
                </div>

                <h1 className="text-xl md:text-2xl lg:text-2xl xl:text-3xl font-bold text-foreground leading-tight">
                  {product.title}
                </h1>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.averageRating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                    <span className="text-sm font-medium ml-2">
                      {product.averageRating.toFixed(1)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      (0 reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2 py-3 border-y border-gray-100">
                {product.discountPercentage > 0 ? (
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="text-2xl md:text-3xl lg:text-3xl font-bold text-primary">
                      $
                      {getDiscountedPrice(
                        product.price,
                        product.discountPercentage
                      )}
                    </span>
                    <span className="text-lg md:text-xl text-muted-foreground line-through">
                      ${product.price}
                    </span>
                    <Badge className="bg-red-500 text-white text-sm">
                      Save $
                      {(
                        (product.price * product.discountPercentage) /
                        100
                      ).toFixed(2)}
                    </Badge>
                  </div>
                ) : (
                  <span className="text-2xl md:text-3xl lg:text-3xl font-bold text-primary">
                    ${product.price}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground text-base">
                  Description
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm line-clamp-3">
                  {product.description}
                </p>
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2 py-2">
                {product.availabilityStatus === "IN_STOCK" ? (
                  <>
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-green-600 font-medium text-sm">
                      In Stock ({product.stock} available)
                    </span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <span className="text-red-600 font-medium text-sm">
                      Out of Stock
                    </span>
                  </>
                )}
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-medium text-sm">Quantity:</span>
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="h-9 w-9 p-0 hover:bg-gray-50"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-3 py-2 font-medium min-w-[2.5rem] text-center border-x text-sm">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= product.stock}
                      className="h-9 w-9 p-0 hover:bg-gray-50"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {product.minimumOrderQuantity > 1 && (
                    <span className="text-xs text-muted-foreground">
                      Min order: {product.minimumOrderQuantity}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <Button
                    onClick={handleAddToCart}
                    disabled={
                      product.availabilityStatus !== "IN_STOCK" || addingToCart
                    }
                    className="w-full bg-gradient-to-r from-primary to-chart-2 hover:from-primary/90 hover:to-chart-2/90 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 h-11"
                    size="lg"
                  >
                    {addingToCart ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Adding...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </Button>

                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="lg" className="h-10">
                      <Zap className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline lg:hidden xl:inline text-sm">
                        Buy Now
                      </span>
                    </Button>

                    <Button
                      variant="outline"
                      size="lg"
                      onClick={handleToggleWishlist}
                      className={`h-10 ${
                        isInWishlist
                          ? "bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
                          : "hover:bg-muted"
                      }`}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          isInWishlist ? "fill-current" : ""
                        }`}
                      />
                      <span className="hidden sm:inline lg:hidden xl:inline ml-1 text-sm">
                        Save
                      </span>
                    </Button>

                    <Button variant="outline" size="lg" className="h-10">
                      <Share2 className="h-4 w-4" />
                      <span className="hidden sm:inline lg:hidden xl:inline ml-1 text-sm">
                        Share
                      </span>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Product Details Cards */}
              <div className="grid grid-cols-3 gap-2 pt-4">
                <Card className="border border-gray-100 shadow-sm">
                  <CardContent className="p-3 text-center">
                    <Truck className="h-5 w-5 lg:h-6 lg:w-6 text-primary mx-auto mb-1" />
                    <h4 className="font-medium text-xs">Free Shipping</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {product.shippingDetails}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border border-gray-100 shadow-sm">
                  <CardContent className="p-3 text-center">
                    <Shield className="h-5 w-5 lg:h-6 lg:w-6 text-primary mx-auto mb-1" />
                    <h4 className="font-medium text-xs">Warranty</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {product.warrantyDetails}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border border-gray-100 shadow-sm">
                  <CardContent className="p-3 text-center">
                    <RefreshCw className="h-5 w-5 lg:h-6 lg:w-6 text-primary mx-auto mb-1" />
                    <h4 className="font-medium text-xs">Returns</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {product.returnPolicy}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Product Specifications */}
          <Card className="mt-6 border border-gray-100 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-base">
                <Package className="h-4 w-4" />
                <span>Product Specifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="space-y-1">
                  <h4 className="font-medium text-xs text-muted-foreground uppercase tracking-wide">
                    Dimensions
                  </h4>
                  <p className="text-sm font-medium">
                    {product.width}" × {product.height}" × {product.depth}"
                  </p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-medium text-xs text-muted-foreground uppercase tracking-wide">
                    Weight
                  </h4>
                  <p className="text-sm font-medium">{product.weight} lbs</p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-medium text-xs text-muted-foreground uppercase tracking-wide">
                    Brand
                  </h4>
                  <p className="text-sm font-medium">{product.brand}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-medium text-xs text-muted-foreground uppercase tracking-wide">
                    Category
                  </h4>
                  <p className="text-sm font-medium">{product.categoryName}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-medium text-xs text-muted-foreground uppercase tracking-wide">
                    SKU
                  </h4>
                  <p className="text-sm font-mono font-medium">{product.sku}</p>
                </div>
                <div className="space-y-1">
                  <h4 className="font-medium text-xs text-muted-foreground uppercase tracking-wide">
                    Availability
                  </h4>
                  <p className="text-sm font-medium">
                    {product.availabilityStatus === "IN_STOCK"
                      ? "In Stock"
                      : "Out of Stock"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
