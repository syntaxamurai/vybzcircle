import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, List, Map } from "lucide-react";

const Clubs = () => {
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [searchMode, setSearchMode] = useState<"near" | "county">("near");

  const clubCategories = [
    "Dance/Night Clubs",
    "Sport Themed Clubs", 
    "Live Themed Clubs",
    "Comedy Themed Clubs",
    "Fine Dining",
    "Casual"
  ];

  return (
    <div className="min-h-screen bg-vybz-dark">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Clubs & Date Nights</h1>
            <p className="text-vybz-light text-lg">Find your perfect vibe for tonight</p>
          </div>

          {/* Search Mode Selection */}
          <div className="flex gap-4 justify-center mb-8">
            <Button
              variant={searchMode === "near" ? "default" : "outline"}
              onClick={() => setSearchMode("near")}
              className="flex items-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              Near Me
            </Button>
            <Button
              variant={searchMode === "county" ? "default" : "outline"}
              onClick={() => setSearchMode("county")}
              className="flex items-center gap-2"
            >
              <Map className="w-4 h-4" />
              My County
            </Button>
          </div>

          {/* View Toggle */}
          <div className="flex gap-2 justify-center mb-8">
            <Button
              variant={viewMode === "map" ? "default" : "outline"}
              onClick={() => setViewMode("map")}
              size="sm"
            >
              <Map className="w-4 h-4 mr-2" />
              Map View
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              onClick={() => setViewMode("list")}
              size="sm"
            >
              <List className="w-4 h-4 mr-2" />
              List View
            </Button>
          </div>

          {viewMode === "map" ? (
            <div className="bg-gray-800 rounded-lg h-96 flex items-center justify-center mb-8">
              <p className="text-gray-400">Interactive Map View Coming Soon</p>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-4">Club Categories</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {clubCategories.map((category) => (
                  <div key={category} className="bg-vybz-surface rounded-lg p-6 hover:bg-vybz-surface/80 transition-colors cursor-pointer">
                    <h3 className="text-white font-semibold mb-2">{category}</h3>
                    <p className="text-vybz-light text-sm">Discover clubs in this category</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Clubs;