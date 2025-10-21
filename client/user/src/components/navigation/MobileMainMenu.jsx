import {
  Home,
  Sparkles,
  Info,
  Mail,
  Layers3,
  ShoppingCart,
} from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const MobileMainMenu = ({ onCategoryClick }) => {
  // Main navigation menu items for mobile with beautiful icons
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

  const handleMenuClick = (item) => {
    if (onCategoryClick) {
      onCategoryClick(item);
    }
  };

  return (
    <div className="space-y-2">
      {/* Main Navigation Items */}
      {navigationItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <Link
            key={item.name}
            to={item.href}
            className="w-full"
            onClick={() => handleMenuClick(item)}
          >
            <Button
              variant="ghost"
              className="group w-full justify-start font-medium hover:bg-primary/10 hover:text-primary transition-all duration-300 py-3 px-4"
            >
              <div className="flex items-center w-full">
                <div
                  className={`p-2 rounded-lg bg-gradient-to-r ${item.gradient} bg-opacity-15 group-hover:bg-opacity-25 transition-all duration-300 mr-4`}
                >
                  <IconComponent className="h-5 w-5 text-gray-700 group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
                </div>
                <span className="flex-1 text-left">{item.name}</span>
                <div
                  className={`w-1 h-6 bg-gradient-to-b ${item.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>
              </div>
            </Button>
          </Link>
        );
      })}

      {/* Sale Link */}
      <Link to="/sale" onClick={() => handleMenuClick({ name: "Sale" })}>
        <Button
          variant="ghost"
          className="group w-full justify-start font-medium bg-gradient-to-r from-red-500/10 to-pink-500/10 hover:from-red-500/20 hover:to-pink-500/20 text-red-600 transition-all duration-300 py-3 px-4"
        >
          <div className="flex items-center w-full">
            <div className="p-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300 mr-4">
              <Sparkles className="h-5 w-5 text-red-600 group-hover:text-red-700 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
            </div>
            <span className="flex-1 text-left font-semibold">Sale</span>
            <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold group-hover:shadow-lg transition-all duration-300">
              HOT
            </span>
          </div>
        </Button>
      </Link>
    </div>
  );
};

export default MobileMainMenu;
