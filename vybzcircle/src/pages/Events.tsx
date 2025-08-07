import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, ChevronRight, MapPin, Ticket } from "lucide-react";

const Events = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const mockEvents = [
    { date: 15, title: "Summer Music Festival", venue: "Uhuru Gardens" },
    { date: 22, title: "Comedy Night", venue: "Carnivore Grounds" },
    { date: 28, title: "Art Exhibition", venue: "Kenya National Theatre" },
  ];

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  return (
    <div className="min-h-screen bg-vybz-dark">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Events</h1>
            <p className="text-vybz-light text-lg">Discover amazing events happening around you</p>
          </div>

          {/* Calendar Navigation */}
          <div className="bg-vybz-surface rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <Button variant="outline" onClick={prevMonth} size="sm">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h2 className="text-2xl font-bold text-white">
                {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h2>
              <Button variant="outline" onClick={nextMonth} size="sm">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-vybz-light font-semibold p-2">
                  {day}
                </div>
              ))}
              {Array.from({ length: 35 }, (_, i) => {
                const day = i - 5; // Adjust for month start
                const hasEvent = mockEvents.some(event => event.date === day);
                return (
                  <div key={i} className="aspect-square">
                    {day > 0 && day <= 31 && (
                      <div className={`w-full h-full flex items-center justify-center rounded cursor-pointer transition-colors ${
                        hasEvent 
                          ? "bg-vybz-primary text-white font-bold" 
                          : "text-vybz-light hover:bg-vybz-surface"
                      }`}>
                        {day}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Featured Events */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Upcoming Events</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockEvents.map((event, index) => (
                <div key={index} className="bg-vybz-surface rounded-lg overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-vybz-primary to-vybz-accent"></div>
                  <div className="p-6">
                    <h3 className="text-white font-semibold text-lg mb-2">{event.title}</h3>
                    <p className="text-vybz-light mb-4 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {event.venue}
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Ticket className="w-4 h-4 mr-2" />
                        Buy Ticket
                      </Button>
                      <Button variant="outline" size="sm">
                        <MapPin className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
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

export default Events;