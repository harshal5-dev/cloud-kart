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
          <div className="hidden lg:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for products..."
                className="pl-10 pr-4 w-full"
              />
            </div>
          </div>

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
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for products..."
                className="pl-10 pr-4 w-full"
              />
            </div>
          </div>
        )}

        {/* Desktop Navigation */}
        <nav className="hidden md:block mt-4 border-t pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 lg:space-x-8">
              <Button
                variant="ghost"
                className="font-medium text-sm lg:text-base"
              >
                Categories
              </Button>
              <Button
                variant="ghost"
                className="font-medium text-sm lg:text-base"
              >
                Electronics
              </Button>
              <Button
                variant="ghost"
                className="font-medium text-sm lg:text-base"
              >
                Fashion
              </Button>
              <Button
                variant="ghost"
                className="font-medium text-sm lg:text-base hidden lg:flex"
              >
                Home & Garden
              </Button>
              <Button
                variant="ghost"
                className="font-medium text-sm lg:text-base hidden lg:flex"
              >
                Sports
              </Button>
              <Button
                variant="ghost"
                className="font-medium text-sm lg:text-base hidden lg:flex"
              >
                Books
              </Button>
              <Button
                variant="ghost"
                className="font-medium text-sm lg:text-base"
              >
                Sale
              </Button>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
              <Button size="sm">Sign Up</Button>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 border-t pt-4 pb-4">
            <div className="space-y-2">
              {/* Navigation Links */}
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start font-medium"
                >
                  Categories
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start font-medium"
                >
                  Electronics
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start font-medium"
                >
                  Fashion
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start font-medium"
                >
                  Home & Garden
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start font-medium"
                >
                  Sports
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start font-medium"
                >
                  Books
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start font-medium"
                >
                  Sale
                </Button>
              </div>

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
