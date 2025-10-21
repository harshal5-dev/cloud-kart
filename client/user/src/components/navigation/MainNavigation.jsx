import {
  Home,
  Grid3x3,
  Sparkles,
  Info,
  Mail,
  Layers3,
  ShoppingCart,
} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const MainNavigation = ({ className }) => {
  // Main navigation menu items with beautiful icons
  const navigationItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      name: "Categories",
      href: "/categories",
      icon: Layers3,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      name: "Products",
      href: "/products",
      icon: ShoppingCart,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      name: "About",
      href: "/about",
      icon: Info,
      gradient: "from-orange-500 to-amber-500",
    },
    {
      name: "Contact",
      href: "/contact",
      icon: Mail,
      gradient: "from-red-500 to-rose-500",
    },
  ];

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      {/* Main Navigation Links */}
      {navigationItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <Link key={item.name} to={item.href}>
            <Button
              variant="ghost"
              className="group font-medium text-sm hover:bg-primary/10 hover:text-primary transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex items-center relative z-10">
                <div
                  className={`p-1 rounded-md bg-gradient-to-r ${item.gradient} bg-opacity-10 group-hover:bg-opacity-20 transition-all duration-300 mr-2`}
                >
                  <IconComponent className="h-4 w-4 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                {item.name}
              </div>
              {/* Hover effect background */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              ></div>
            </Button>
          </Link>
        );
      })}

      {/* Sale Link */}
      <Link to="/sale">
        <Button className="group bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
          <div className="flex items-center relative z-10">
            <div className="p-1 rounded-md bg-white/20 group-hover:bg-white/30 transition-all duration-300 mr-2">
              <Sparkles className="h-4 w-4 text-yellow-200 group-hover:text-yellow-100 group-hover:scale-110 transition-all duration-300" />
            </div>
            Sale
            <span className="ml-2 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold group-hover:bg-yellow-300 transition-colors duration-300">
              HOT
            </span>
          </div>
          {/* Animated shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </Button>
      </Link>
    </div>
  );
};
export default MainNavigation;
