import { Button } from "@/components/ui/button";
import { Menu, X, Calendar, MapPin, Users, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-vybz-dark/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <Link to="/" className="text-xl font-bold text-white">The Vybz Circle</Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white/80 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/events" className="text-white/80 hover:text-white transition-colors">
              Events
            </Link>
            <Link to="/clubs" className="text-white/80 hover:text-white transition-colors">
              Clubs
            </Link>
            <Link to="/hosts" className="text-white/80 hover:text-white transition-colors">
              Hosts
            </Link>
            <Link to="/brands" className="text-white/80 hover:text-white transition-colors">
              Brands
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-white hover:text-vybz-pink">
              Sign In
            </Button>
            <Button variant="vybz" size="sm">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-vybz-surface/95 backdrop-blur-md rounded-lg mt-2 border border-white/10">
              <Link
                to="/"
                className="block px-3 py-2 text-white/80 hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                to="/events"
                className="block px-3 py-2 text-white/80 hover:text-white transition-colors"
              >
                Events
              </Link>
              <Link
                to="/clubs"
                className="block px-3 py-2 text-white/80 hover:text-white transition-colors"
              >
                Clubs
              </Link>
              <Link
                to="/hosts"
                className="block px-3 py-2 text-white/80 hover:text-white transition-colors"
              >
                Hosts
              </Link>
              <Link
                to="/brands"
                className="block px-3 py-2 text-white/80 hover:text-white transition-colors"
              >
                Brands
              </Link>
              <div className="flex flex-col space-y-2 px-3 pt-4">
                <Button variant="ghost" className="text-white hover:text-vybz-pink">
                  Sign In
                </Button>
                <Button variant="vybz" size="sm">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;