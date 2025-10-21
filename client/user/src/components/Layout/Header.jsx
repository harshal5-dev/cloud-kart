import {
  ShoppingCart,
  Search,
  Menu,
  User,
  Heart,
  MapPin,
  X,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { Link } from "react-router-dom";
import MainNavigation from "../navigation/MainNavigation";
import MobileMainMenu from "../navigation/MobileMainMenu";
import ProductSearch from "./ProductSearch";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top Bar - Hidden on mobile */}
      <div className="bg-primary text-primary-foreground hidden md:block">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span>Free shipping on orders over $50</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span>24/7 Customer Support</span>
              <span>|</span>
              <span>Track Your Order</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Clean Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 group hover:no-underline"
          >
            {/* Logo Icon */}
            <img
              src="/logo-icon.svg"
              alt="Cloud Kart Logo"
              className="h-9 w-9 md:h-10 md:w-10 transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                // Fallback to text logo if image fails to load
                e.target.style.display = "none";
                e.target.nextElementSibling.style.display = "flex";
              }}
            />
            {/* Fallback text logo */}
            <div className="hidden h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-chart-2 text-primary-foreground font-bold text-lg md:text-xl">
              C
            </div>

            {/* Logo Text */}
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                Cloud Kart
              </span>
              <span className="text-xs text-muted-foreground hidden sm:block">
                Your Digital Shopping Hub
              </span>
            </div>
          </Link>

          {/* Search Bar - Desktop only */}
          <ProductSearch />

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Mobile Search Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist - Hidden on small mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="relative hidden sm:flex"
            >
              <Heart className="h-5 w-5" />
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-4 w-4 md:h-5 md:w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                3
              </Badge>
            </Button>

            {/* Shopping Cart */}
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-4 w-4 md:h-5 md:w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                2
              </Badge>
            </Button>

            {/* User - Hidden on small mobile */}
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <User className="h-5 w-5" />
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isMobileSearchOpen && (
          <div className="mt-3 lg:hidden">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const searchTerm = formData.get("search");
                if (searchTerm?.trim()) {
                  window.location.href = `/search?q=${encodeURIComponent(
                    searchTerm
                  )}`;
                  setIsMobileSearchOpen(false);
                }
              }}
              className="relative"
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
              <Input
                name="search"
                type="search"
                placeholder="Search for products, brands..."
                className="pl-10 pr-20 w-full bg-background/80 backdrop-blur-sm"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 px-3 bg-gradient-to-r from-primary to-chart-2 text-white text-xs"
              >
                Search
              </Button>
            </form>
          </div>
        )}

        {/* Enhanced Desktop Navigation */}
        <nav className="hidden md:block mt-6 border-t pt-4">
          <div className="flex items-center justify-between">
            {/* Categories Navigation Menu */}
            <MainNavigation />

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="hover:bg-primary hover:text-primary-foreground transition-all duration-200 border-primary/20"
              >
                Sign In
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-primary to-chart-2 hover:from-primary/90 hover:to-chart-2/90 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </nav>

        {/* Enhanced Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 border-t pt-4 pb-4 animate-in slide-in-from-top duration-300">
            <div className="space-y-3">
              {/* Mobile Categories Navigation */}
              <MobileMainMenu
                onCategoryClick={() => setIsMobileMenuOpen(false)}
              />

              {/* Mobile Auth Buttons */}
              <div className="pt-4 border-t space-y-2">
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
                <Button className="w-full">Sign Up</Button>
              </div>

              {/* Mobile User Actions */}
              <div className="pt-4 border-t space-y-2 sm:hidden">
                <Button variant="ghost" className="w-full justify-start">
                  <User className="h-4 w-4 mr-3" />
                  My Account
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Heart className="h-4 w-4 mr-3" />
                  Wishlist (3)
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
