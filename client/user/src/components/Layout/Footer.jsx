import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Shield,
  Truck,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t">
      {/* Newsletter Section */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg md:text-xl font-semibold mb-2">
                Stay Updated
              </h3>
              <p className="text-sm md:text-base text-primary-foreground/80">
                Subscribe to get special offers, free giveaways, and updates.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row w-full md:w-auto max-w-md gap-2 sm:gap-0">
              <Input
                type="email"
                placeholder="Enter your email"
                className="rounded-r-none sm:rounded-r-none bg-background text-foreground"
              />
              <Button
                variant="secondary"
                className="rounded-l-none sm:rounded-l-none"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-3 md:mb-4 justify-center sm:justify-start">
              <div className="flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-base md:text-lg">
                C
              </div>
              <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                Cloud Kart
              </span>
            </div>
            <p className="text-sm md:text-base text-muted-foreground mb-4 text-center sm:text-left">
              Your one-stop destination for quality products at unbeatable
              prices. Shop with confidence and convenience.
            </p>
            <div className="flex space-x-3 md:space-x-4 justify-center sm:justify-start">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 md:h-10 md:w-10"
              >
                <Facebook className="h-3 w-3 md:h-4 md:w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 md:h-10 md:w-10"
              >
                <Twitter className="h-3 w-3 md:h-4 md:w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 md:h-10 md:w-10"
              >
                <Instagram className="h-3 w-3 md:h-4 md:w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 md:h-10 md:w-10"
              >
                <Youtube className="h-3 w-3 md:h-4 md:w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-sm md:text-base font-semibold mb-3 md:mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Button
                  variant="ghost"
                  className="h-auto p-0 font-normal text-xs md:text-sm"
                >
                  About Us
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="h-auto p-0 font-normal text-xs md:text-sm"
                >
                  Contact Us
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="h-auto p-0 font-normal text-xs md:text-sm"
                >
                  FAQ
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="h-auto p-0 font-normal text-xs md:text-sm"
                >
                  Shipping Info
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="h-auto p-0 font-normal text-xs md:text-sm"
                >
                  Returns
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="h-auto p-0 font-normal text-xs md:text-sm"
                >
                  Size Guide
                </Button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="text-center sm:text-left">
            <h3 className="text-sm md:text-base font-semibold mb-3 md:mb-4">
              Categories
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Button
                  variant="ghost"
                  className="h-auto p-0 font-normal text-xs md:text-sm"
                >
                  Electronics
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="h-auto p-0 font-normal text-xs md:text-sm"
                >
                  Fashion
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="h-auto p-0 font-normal text-xs md:text-sm"
                >
                  Home & Garden
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="h-auto p-0 font-normal text-xs md:text-sm"
                >
                  Sports
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="h-auto p-0 font-normal text-xs md:text-sm"
                >
                  Books
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="h-auto p-0 font-normal text-xs md:text-sm"
                >
                  Toys
                </Button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="sm:col-span-2 lg:col-span-1 text-center sm:text-left">
            <h3 className="text-sm md:text-base font-semibold mb-3 md:mb-4">
              Contact Info
            </h3>
            <div className="space-y-2 md:space-y-3 text-muted-foreground">
              <div className="flex items-center space-x-2 justify-center sm:justify-start">
                <MapPin className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                <span className="text-xs md:text-sm">
                  123 Commerce St, Business District
                </span>
              </div>
              <div className="flex items-center space-x-2 justify-center sm:justify-start">
                <Phone className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                <span className="text-xs md:text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 justify-center sm:justify-start">
                <Mail className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                <span className="text-xs md:text-sm">
                  support@cloudkart.com
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t mt-6 md:mt-8 pt-6 md:pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="flex items-center space-x-2 md:space-x-3 justify-center sm:justify-start">
              <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-primary/10">
                <Truck className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              </div>
              <div>
                <h4 className="text-sm md:text-base font-medium">
                  Free Shipping
                </h4>
                <p className="text-xs md:text-sm text-muted-foreground">
                  On orders over $50
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 md:space-x-3 justify-center sm:justify-start">
              <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              </div>
              <div>
                <h4 className="text-sm md:text-base font-medium">
                  Secure Payment
                </h4>
                <p className="text-xs md:text-sm text-muted-foreground">
                  100% protected
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 md:space-x-3 justify-center sm:justify-start">
              <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-primary/10">
                <CreditCard className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Easy Returns</h4>
                <p className="text-sm text-muted-foreground">30-day policy</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-4 border-t">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © 2025 Cloud Kart. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <Button
                variant="ghost"
                className="h-auto p-0 font-normal text-sm"
              >
                Privacy Policy
              </Button>
              <Button
                variant="ghost"
                className="h-auto p-0 font-normal text-sm"
              >
                Terms of Service
              </Button>
              <Button
                variant="ghost"
                className="h-auto p-0 font-normal text-sm"
              >
                Cookies
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
