import {
  ArrowRight,
  Star,
  Zap,
  Shield,
  Truck,
  HeadphonesIcon,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import Layout from "../components/Layout/Layout";

const Home = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 129.99,
      originalPrice: 199.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 1247,
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "Smart Watch Series 9",
      price: 299.99,
      originalPrice: 399.99,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 893,
      badge: "New Arrival",
    },
    {
      id: 3,
      name: "Premium Coffee Machine",
      price: 449.99,
      originalPrice: 599.99,
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 654,
      badge: "25% Off",
    },
    {
      id: 4,
      name: "Ergonomic Office Chair",
      price: 299.99,
      originalPrice: 449.99,
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 432,
      badge: "Sale",
    },
  ];

  const categories = [
    {
      name: "Electronics",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop",
      count: "2,450+ items",
    },
    {
      name: "Fashion",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop",
      count: "5,230+ items",
    },
    {
      name: "Home & Garden",
      image:
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=200&fit=crop",
      count: "3,140+ items",
    },
    {
      name: "Sports",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
      count: "1,890+ items",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4 py-12 md:py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit mx-auto lg:mx-0">
                  🎉 New Collection Launched
                </Badge>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Discover Your
                  <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                    {" "}
                    Perfect Style
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0">
                  Shop the latest trends and timeless classics. Quality products
                  at unbeatable prices with fast, free shipping.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Button size="lg" className="text-base lg:text-lg px-6 lg:px-8">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 lg:h-5 lg:w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-base lg:text-lg px-6 lg:px-8"
                >
                  View Collections
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-4 max-w-md mx-auto lg:mx-0">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-primary">
                    50K+
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    Happy Customers
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-primary">
                    15K+
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    Products
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-primary">
                    99.9%
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    Satisfaction
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mt-8 lg:mt-0">
              <div className="grid grid-cols-2 gap-3 md:gap-4 max-w-md mx-auto lg:max-w-none">
                <div className="space-y-3 md:space-y-4">
                  <Card className="overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop"
                      alt="Sneakers"
                      className="w-full h-32 sm:h-40 lg:h-48 object-cover"
                    />
                  </Card>
                  <Card className="overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop"
                      alt="Sunglasses"
                      className="w-full h-24 sm:h-28 lg:h-32 object-cover"
                    />
                  </Card>
                </div>
                <div className="space-y-3 md:space-y-4 pt-4 sm:pt-6 lg:pt-8">
                  <Card className="overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=300&fit=crop"
                      alt="Fashion"
                      className="w-full h-24 sm:h-28 lg:h-32 object-cover"
                    />
                  </Card>
                  <Card className="overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop"
                      alt="Watch"
                      className="w-full h-32 sm:h-40 lg:h-48 object-cover"
                    />
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center">
              <div className="flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-3 md:mb-4">
                <Truck className="h-6 w-6 md:h-8 md:w-8 text-primary" />
              </div>
              <h3 className="text-base md:text-lg font-semibold mb-2">
                Free Shipping
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Free delivery on orders over $50
              </p>
            </div>

            <div className="text-center">
              <div className="flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-3 md:mb-4">
                <Shield className="h-6 w-6 md:h-8 md:w-8 text-primary" />
              </div>
              <h3 className="text-base md:text-lg font-semibold mb-2">
                Secure Payment
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">
                100% secure transactions
              </p>
            </div>

            <div className="text-center">
              <div className="flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-3 md:mb-4">
                <Zap className="h-6 w-6 md:h-8 md:w-8 text-primary" />
              </div>
              <h3 className="text-base md:text-lg font-semibold mb-2">
                Fast Delivery
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Express shipping available
              </p>
            </div>

            <div className="text-center">
              <div className="flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-3 md:mb-4">
                <HeadphonesIcon className="h-6 w-6 md:h-8 md:w-8 text-primary" />
              </div>
              <h3 className="text-base md:text-lg font-semibold mb-2">
                24/7 Support
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Round-the-clock assistance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
              Shop by Category
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Discover our diverse range of products
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-32 sm:h-40 md:h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4 text-white">
                    <h3 className="text-sm sm:text-base md:text-xl font-semibold mb-1">
                      {category.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80">
                      {category.count}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 md:mb-12">
            <div className="mb-4 sm:mb-0">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4">
                Featured Products
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                Handpicked favorites just for you
              </p>
            </div>
            <Button variant="outline" size="sm" className="w-fit">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-2 sm:top-3 left-2 sm:left-3 text-xs">
                    {product.badge}
                  </Badge>
                </div>

                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 sm:h-4 sm:w-4 ${
                            i < Math.floor(product.rating)
                              ? "fill-primary text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs sm:text-sm text-muted-foreground ml-1 sm:ml-2">
                      ({product.reviews})
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-semibold mb-2 line-clamp-2">
                    {product.name}
                  </h3>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg sm:text-xl font-bold text-primary">
                          ${product.price}
                        </span>
                        <span className="text-xs sm:text-sm text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      </div>
                    </div>
                    <Button size="sm" className="w-full sm:w-auto">
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary to-chart-2 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Join thousands of satisfied customers and discover amazing deals
            today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg">
              Create Account
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg border-white text-white hover:bg-white hover:text-primary"
            >
              Browse Products
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
