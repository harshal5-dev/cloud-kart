import { Link } from "react-router-dom";
import {
  Home,
  ArrowLeft,
  Search,
  ShoppingCart,
  Package,
  Frown,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        {/* Main 404 Card */}
        <Card className="border-0 shadow-2xl bg-background/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            {/* Animated 404 Number */}
            <div className="relative mb-6">
              <div className="text-8xl md:text-9xl font-black bg-gradient-to-r from-primary via-chart-2 to-primary bg-clip-text text-transparent animate-pulse">
                404
              </div>
              {/* Floating elements */}
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
                <Frown className="absolute top-4 right-16 h-6 w-6 text-muted-foreground animate-bounce delay-100" />
                <Package className="absolute bottom-8 left-12 h-5 w-5 text-primary/60 animate-bounce delay-300" />
                <Sparkles className="absolute top-12 left-20 h-4 w-4 text-chart-2/60 animate-bounce delay-500" />
              </div>
            </div>

            <CardTitle className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Oops! Page Not Found
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground max-w-md mx-auto">
              The page you're looking for seems to have wandered off into the
              digital wilderness. Don't worry, it happens to the best of us!
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Error Info */}
            <div className="text-center space-y-3">
              <Badge
                variant="secondary"
                className="px-4 py-2 text-sm bg-gradient-to-r from-red-50 to-orange-50 text-red-700 border border-red-200"
              >
                Error Code: 404 - Resource Not Found
              </Badge>

              <p className="text-sm text-muted-foreground">
                The requested URL was not found on this server.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link to="/">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-primary to-chart-2 hover:from-primary/90 hover:to-chart-2/90 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <Home className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Back to Home
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                onClick={() => window.history.back()}
                className="w-full sm:w-auto border-primary/20 hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 group"
              >
                <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                Go Back
              </Button>

              <Button
                variant="ghost"
                size="lg"
                onClick={() => window.location.reload()}
                className="w-full sm:w-auto hover:bg-muted transition-all duration-300 group"
              >
                <RefreshCw className="h-5 w-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                Refresh
              </Button>
            </div>

            {/* Helpful Links */}
            <div className="border-t pt-6">
              <p className="text-center text-sm text-muted-foreground mb-4">
                Maybe you're looking for one of these?
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link to="/categories">
                  <Button
                    variant="ghost"
                    className="w-full justify-start hover:bg-purple-50 hover:text-purple-700 transition-all duration-300 group"
                  >
                    <Package className="h-4 w-4 mr-3 text-purple-500 group-hover:scale-110 transition-transform duration-300" />
                    Browse Categories
                  </Button>
                </Link>

                <Link to="/products">
                  <Button
                    variant="ghost"
                    className="w-full justify-start hover:bg-green-50 hover:text-green-700 transition-all duration-300 group"
                  >
                    <ShoppingCart className="h-4 w-4 mr-3 text-green-500 group-hover:scale-110 transition-transform duration-300" />
                    View Products
                  </Button>
                </Link>
              </div>
            </div>

            {/* Search Suggestion */}
            <div className="bg-gradient-to-r from-muted/50 to-muted/30 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center space-x-2 text-muted-foreground mb-2">
                <Search className="h-4 w-4" />
                <span className="text-sm font-medium">
                  Try searching instead
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Use the search bar in the header to find what you're looking for
              </p>
            </div>

            {/* Fun Message */}
            <div className="text-center pt-4 border-t">
              <p className="text-xs text-muted-foreground italic">
                "Not all who wander are lost... but this page definitely is!" 🗺️
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Background Decorations */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-10 w-32 h-32 bg-primary/5 rounded-full blur-xl"></div>
          <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-chart-2/5 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-primary/3 to-chart-2/3 rounded-full blur-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
