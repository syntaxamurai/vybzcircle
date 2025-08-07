import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Music, 
  PartyPopper, 
  Heart,
  Baby,
  Gamepad2,
  Mic,
  Drama
} from "lucide-react";

const Categories = () => {
  const adultCategories = [
    {
      title: "Clubs & Date Nights",
      description: "Find the perfect spot for a night out or romantic evening",
      icon: Heart,
      gradient: "from-vybz-purple to-vybz-pink",
    },
    {
      title: "Events",
      description: "Discover exciting events happening near you",
      icon: Calendar,
      gradient: "from-vybz-blue to-vybz-purple",
    },
    {
      title: "Hosts",
      description: "Connect with popular event hosts and entertainers",
      icon: Users,
      gradient: "from-vybz-pink to-vybz-purple",
    },
    {
      title: "Brands",
      description: "Explore performances, comedy shows, and artistic showcases",
      icon: PartyPopper,
      gradient: "from-vybz-purple to-vybz-blue",
    },
  ];

  const familyCategories = [
    {
      title: "Family Events",
      description: "Fun activities for the whole family to enjoy together",
      icon: Baby,
      gradient: "from-green-400 to-blue-500",
    },
    {
      title: "Kids Entertainment",
      description: "Exciting shows and activities designed for children",
      icon: Gamepad2,
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      title: "Educational Shows",
      description: "Learning experiences that entertain and educate",
      icon: Mic,
      gradient: "from-blue-400 to-purple-500",
    },
    {
      title: "Community Arts",
      description: "Local performances and cultural celebrations",
      icon: Drama,
      gradient: "from-purple-400 to-pink-500",
    },
  ];

  return (
    <section className="py-20 bg-gradient-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Discover Your <span className="bg-gradient-primary bg-clip-text text-transparent">Vibe</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            From electrifying nightlife to family-friendly fun, we bring all entertainment into one place
          </p>
        </div>

        {/* 18+ Events Section */}
        <div className="mb-20">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-vybz-surface-elevated rounded-full px-6 py-2 border border-white/20">
              <span className="text-vybz-pink font-semibold">18+ Events</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {adultCategories.map((category, index) => (
              <Card key={index} className="bg-vybz-surface border-white/20 hover:border-vybz-purple/50 transition-all duration-300 hover:scale-105 group">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${category.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-white text-lg">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 text-sm text-center mb-4">{category.description}</p>
                  <Button variant="glass" className="w-full">
                    Explore
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Family Friendly Section */}
        <div>
          <div className="flex items-center justify-center mb-8">
            <div className="bg-vybz-surface-elevated rounded-full px-6 py-2 border border-white/20">
              <span className="text-vybz-blue font-semibold">Family Friendly Fun</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {familyCategories.map((category, index) => (
              <Card key={index} className="bg-vybz-surface border-white/20 hover:border-vybz-blue/50 transition-all duration-300 hover:scale-105 group">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${category.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-white text-lg">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 text-sm text-center mb-4">{category.description}</p>
                  <Button variant="glass" className="w-full">
                    Explore
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;