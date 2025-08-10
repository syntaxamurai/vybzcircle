import { Sparkles, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-vybz-dark border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <img
                  src="/placeholder.ico"
                  alt="The Vybz Circle Logo"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
              <span className="text-xl font-bold text-white">The Vybz Circle</span>
            </div>
            <p className="text-white/70 text-sm">
              Bringing the vibe close to you. Discover the best entertainment experiences across Kenya.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/60 hover:text-vybz-purple transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-vybz-pink transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-vybz-blue transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-vybz-purple transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-white/70 hover:text-white transition-colors">Home</a></li>
              <li><a href="/events" className="text-white/70 hover:text-white transition-colors">Events</a></li>
              <li><a href="/clubs" className="text-white/70 hover:text-white transition-colors">Clubs</a></li>
              <li><a href="/hosts" className="text-white/70 hover:text-white transition-colors">Hosts</a></li>
              <li><a href="/brands" className="text-white/70 hover:text-white transition-colors">Brands</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="clubs" className="text-white/70 hover:text-white transition-colors">Night Clubs</a></li>
              <li><a href="/" className="text-white/70 hover:text-white transition-colors">Live Music</a></li>
              <li><a href="/" className="text-white/70 hover:text-white transition-colors">Comedy Shows</a></li>
              <li><a href="/" className="text-white/70 hover:text-white transition-colors">Family Events</a></li>
              <li><a href="/" className="text-white/70 hover:text-white transition-colors">Fine Dining</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 text-white/70">
                <Mail className="h-4 w-4" />
                <span>hello@vybzcircle.com</span>
              </div>
              <div className="flex items-center space-x-2 text-white/70">
                <Phone className="h-4 w-4" />
                <span>+254 700 000 000</span>
              </div>
              <div className="flex items-center space-x-2 text-white/70">
                <MapPin className="h-4 w-4" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              © 2025 The Vybz Circle. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;