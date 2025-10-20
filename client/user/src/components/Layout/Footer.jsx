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
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
              <p className="text-primary-foreground/80">
                Subscribe to get special offers, free giveaways, and updates.
              </p>
            </div>
            <div className="flex w-full md:w-auto max-w-md">
              <Input
                type="email"
                placeholder="Enter your email"
                className="rounded-r-none bg-background text-foreground"
              />
              <Button variant="secondary" className="rounded-l-none">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-lg">
                C
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                Cloud Kart
              </span>
            </div>
            <p className="text-muted-foreground mb-4">
              Your one-stop destination for quality products at unbeatable
              prices. Shop with confidence and convenience.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Button variant="ghost" className="h-auto p-0 font-normal">
                  About Us
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="h-auto p-0 font-normal">
                  Contact Us
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="h-auto p-0 font-normal">
                  FAQ
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="h-auto p-0 font-normal">
                  Shipping Info
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="h-auto p-0 font-normal">
                  Returns
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="h-auto p-0 font-normal">
                  Size Guide
                </Button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Button variant="ghost" className="h-auto p-0 font-normal">
                  Electronics
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="h-auto p-0 font-normal">
                  Fashion
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="h-auto p-0 font-normal">
                  Home & Garden
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="h-auto p-0 font-normal">
                  Sports
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="h-auto p-0 font-normal">
                  Books
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="h-auto p-0 font-normal">
                  Toys
                </Button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">
                  123 Commerce St, Business District
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">support@cloudkart.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Truck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Free Shipping</h4>
                <p className="text-sm text-muted-foreground">
                  On orders over $50
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Secure Payment</h4>
                <p className="text-sm text-muted-foreground">100% protected</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <CreditCard className="h-5 w-5 text-primary" />
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
