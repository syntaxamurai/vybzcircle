import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Star } from "lucide-react";

const Hosts = () => {
  const mockHosts = [
    {
      id: 1,
      name: "DJ Kriss Darlin",
      image: "/placeholder-host.jpg",
      rating: 4.8,
      events: 15,
      specialty: "House & Afrobeats"
    },
    {
      id: 2,
      name: "MC Gikuyu",
      image: "/placeholder-host.jpg",
      rating: 4.9,
      events: 23,
      specialty: "Comedy & Events"
    },
    {
      id: 3,
      name: "Band Sauti Sol",
      image: "/placeholder-host.jpg",
      rating: 4.7,
      events: 8,
      specialty: "Live Music"
    },
    {
      id: 4,
      name: "Chef Koinange",
      image: "/placeholder-host.jpg",
      rating: 4.6,
      events: 12,
      specialty: "Culinary Events"
    }
  ];

  return (
    <div className="min-h-screen bg-vybz-dark">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Hosts</h1>
            <p className="text-vybz-light text-lg">Meet the amazing hosts bringing you the best vibes</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockHosts.map((host) => (
              <div key={host.id} className="bg-vybz-surface rounded-lg overflow-hidden hover:bg-vybz-surface/80 transition-colors">
                <div className="h-48 bg-gradient-to-br from-vybz-primary to-vybz-accent flex items-center justify-center">
                  <Users className="w-16 h-16 text-white opacity-50" />
                </div>
                <div className="p-6">
                  <h3 className="text-white font-semibold text-lg mb-2">{host.name}</h3>
                  <p className="text-vybz-light text-sm mb-3">{host.specialty}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm">{host.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-vybz-light" />
                      <span className="text-vybz-light text-sm">{host.events} events</span>
                    </div>
                  </div>
                  
                  <Button className="w-full" size="sm">
                    View Calendar
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Host Categories */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Host Categories</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-vybz-surface rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-vybz-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">DJs & Musicians</h3>
                <p className="text-vybz-light text-sm">Professional DJs and live music performers</p>
              </div>
              
              <div className="bg-vybz-surface rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-vybz-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">Event MCs</h3>
                <p className="text-vybz-light text-sm">Experienced masters of ceremony</p>
              </div>
              
              <div className="bg-vybz-surface rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-vybz-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">Performers</h3>
                <p className="text-vybz-light text-sm">Comedians, dancers, and entertainers</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Hosts;