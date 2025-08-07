import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Music, Laugh, Palette, Calendar } from "lucide-react";

const Brands = () => {
  const [activeCategory, setActiveCategory] = useState("musical");

  const categories = [
    { id: "musical", name: "Musical", icon: Music },
    { id: "comedy", name: "Comedy", icon: Laugh },
    { id: "art", name: "Art/Dance", icon: Palette },
  ];

  const mockEvents = {
    musical: [
      { title: "Jazz Under the Stars", date: "Mar 15", venue: "Alliance Française" },
      { title: "Afrobeats Live", date: "Mar 22", venue: "Carnivore Grounds" },
      { title: "Classical Evening", date: "Mar 28", venue: "Kenya National Theatre" },
    ],
    comedy: [
      { title: "Stand-Up Night", date: "Mar 12", venue: "Laughter Lounge" },
      { title: "Comedy Central Live", date: "Mar 19", venue: "KICC" },
      { title: "Open Mic Comedy", date: "Mar 26", venue: "Java House" },
    ],
    art: [
      { title: "Contemporary Art Show", date: "Mar 10", venue: "Nairobi Gallery" },
      { title: "Dance Festival", date: "Mar 17", venue: "National Theatre" },
      { title: "Street Art Exhibition", date: "Mar 24", venue: "GoDown Arts Centre" },
    ],
  };

  return (
    <div className="min-h-screen bg-vybz-dark">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Brands</h1>
            <p className="text-vybz-light text-lg">Discover amazing artistic experiences</p>
          </div>

          {/* Category Selection */}
          <div className="flex justify-center gap-4 mb-8">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  onClick={() => setActiveCategory(category.id)}
                  className="flex items-center gap-2"
                >
                  <IconComponent className="w-4 h-4" />
                  {category.name}
                </Button>
              );
            })}
          </div>

          {/* Category Description */}
          <div className="text-center mb-12">
            {activeCategory === "musical" && (
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-white mb-4">Musical Experiences</h2>
                <p className="text-vybz-light">From jazz sessions to live concerts, discover the rhythm of Nairobi's music scene</p>
              </div>
            )}
            {activeCategory === "comedy" && (
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-white mb-4">Comedy Shows</h2>
                <p className="text-vybz-light">Laugh out loud with Kenya's funniest comedians and emerging talents</p>
              </div>
            )}
            {activeCategory === "art" && (
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-white mb-4">Art & Dance</h2>
                <p className="text-vybz-light">Immerse yourself in Kenya's vibrant art and dance culture</p>
              </div>
            )}
          </div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {mockEvents[activeCategory as keyof typeof mockEvents].map((event, index) => (
              <div key={index} className="bg-vybz-surface rounded-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-vybz-primary to-vybz-accent flex items-center justify-center">
                  {activeCategory === "musical" && <Music className="w-16 h-16 text-white opacity-50" />}
                  {activeCategory === "comedy" && <Laugh className="w-16 h-16 text-white opacity-50" />}
                  {activeCategory === "art" && <Palette className="w-16 h-16 text-white opacity-50" />}
                </div>
                <div className="p-6">
                  <h3 className="text-white font-semibold text-lg mb-2">{event.title}</h3>
                  <p className="text-vybz-light text-sm mb-2">{event.venue}</p>
                  <p className="text-vybz-accent font-semibold mb-4">{event.date}</p>
                  <Button size="sm" className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Featured Brands */}
          <div className="bg-vybz-surface rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Featured Brands</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {["Safaricom", "Tusker", "KCB", "Equity Bank"].map((brand) => (
                <div key={brand} className="text-center">
                  <div className="w-20 h-20 bg-vybz-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-sm">{brand.slice(0, 2)}</span>
                  </div>
                  <h3 className="text-white font-semibold">{brand}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Brands;