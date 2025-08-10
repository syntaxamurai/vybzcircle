import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Calendar,
  MapPin,
  Users,
  Sparkles,
  User,
  ShoppingCart,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  // safe cart access
  let totalTickets = 0;
  try {
    const { cart } = useCart();
    totalTickets = Array.isArray(cart) ? cart.reduce((s, i) => s + (i.quantity || 0), 0) : 0;
  } catch (e) {
    // if CartProvider is not ready or path is wrong, avoid crashing the nav
    totalTickets = 0;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-vybz-dark/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
              <img
                src="/placeholder.ico"
                alt="The Vybz Circle Logo"
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>
            <Link to="/" className="text-xl font-bold text-white">
              The Vybz Circle
            </Link>
          </div>

          {/* Desktop nav links */}
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
            <Button asChild variant="default">
              <Link to="/upload-event">Upload Event</Link>
            </Button>
          </div>

          {/* Mobile cart + hamburger container */}
          <div className="md:hidden flex items-center space-x-2 ml-auto">
            {user && (
              <Link to="/cart" className="relative">
                <ShoppingCart className="w-6 h-6 text-white" />
                {totalTickets > 0 && (
                  <span className="absolute -top-2 -right-2 bg-vybz-pink text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalTickets}
                  </span>
                )}
              </Link>
            )}

            <button
              className="text-white"
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>


          {/* Desktop right side (cart + CTAs) */}
          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <Link to="/cart" className="relative mr-2">
                <ShoppingCart className="w-6 h-6 text-white" />
                {totalTickets > 0 && (
                  <span className="absolute -top-2 -right-2 bg-vybz-pink text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalTickets}
                  </span>
                )}
              </Link>
            )}

            {user ? (
              <Link to="/profile">
                <Button variant="ghost" className="text-white hover:text-vybz-pink">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" className="text-white hover:text-vybz-pink">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button variant="vybz" size="sm">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu (absolutely positioned below nav) */}
        {isMenuOpen && (
          <div className="md:hidden absolute left-4 right-4 top-full mt-2 z-50">
            <div className="bg-vybz-surface/95 backdrop-blur-md rounded-lg p-3 border border-white/10 text-white space-y-2 shadow-lg">
              <Link to="/" className="block px-3 py-2 rounded hover:bg-white/5" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/events" className="block px-3 py-2 rounded hover:bg-white/5" onClick={() => setIsMenuOpen(false)}>Events</Link>
              <Link to="/clubs" className="block px-3 py-2 rounded hover:bg-white/5" onClick={() => setIsMenuOpen(false)}>Clubs</Link>
              <Link to="/hosts" className="block px-3 py-2 rounded hover:bg-white/5" onClick={() => setIsMenuOpen(false)}>Hosts</Link>
              <Link to="/brands" className="block px-3 py-2 rounded hover:bg-white/5" onClick={() => setIsMenuOpen(false)}>Brands</Link>

              <Button asChild variant="default">
                <Link to="/upload-event">Upload Event</Link>
              </Button>

              <div className="pt-2 border-t border-white/5">
                {user ? (
                  <Link to="/profile" className="block px-3 py-2 rounded hover:bg-white/5" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="ghost" className="w-full text-left text-white hover:text-vybz-pink">
                      <User className="w-4 h-4 mr-2" /> Profile
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/auth" className="block px-3 py-2 rounded hover:bg-white/5" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full text-left text-white hover:text-vybz-pink">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/auth" className="block px-3 py-2 rounded hover:bg-white/5" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="vybz" size="sm" className="w-full">Get Started</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
