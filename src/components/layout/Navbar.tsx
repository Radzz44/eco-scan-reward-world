
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Recycle, Award, Store, MapPin } from "lucide-react";
import logo from "@/assets/logo.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { name: "Scan", path: "/", icon: <Recycle className="h-5 w-5 mr-2" /> },
    { name: "Rewards", path: "/rewards", icon: <Award className="h-5 w-5 mr-2" /> },
    { name: "Partners", path: "/partners", icon: <Store className="h-5 w-5 mr-2" /> },
    { name: "Collection", path: "/collection", icon: <MapPin className="h-5 w-5 mr-2" /> },
  ];

  return (
    <nav className="bg-white shadow dark:bg-gray-950">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="bg-eco-primary rounded-full p-2 mr-2">
                <Recycle className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-eco-dark dark:text-white">DeepWaste</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-2">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant={location.pathname === item.path ? "default" : "ghost"}
                className={location.pathname === item.path ? "bg-eco-primary text-white" : ""}
                asChild
              >
                <Link to={item.path} className="flex items-center">
                  {item.icon}
                  {item.name}
                </Link>
              </Button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-3 space-y-2 py-3 animate-fade-in">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant={location.pathname === item.path ? "default" : "ghost"}
                className={`w-full justify-start ${location.pathname === item.path ? "bg-eco-primary text-white" : ""}`}
                asChild
                onClick={() => setIsOpen(false)}
              >
                <Link to={item.path} className="flex items-center">
                  {item.icon}
                  {item.name}
                </Link>
              </Button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
