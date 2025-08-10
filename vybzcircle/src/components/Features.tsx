import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MapPin, 
  Calendar, 
  Bell, 
  CreditCard, 
  Search, 
  Shield,
  Smartphone,
  Globe
} from "lucide-react";

const Features = () => {
  const features = [
    {
      title: "Location-Based Discovery",
      description: "Find events near you with our radius search feature. Set your distance preference and discover the vibe within your comfort zone.",
      icon: MapPin,
      color: "text-vybz-purple"
    },
    {
      title: "Smart Calendar View",
      description: "See all events in an intuitive calendar format. Plan ahead and never miss your favorite vibe again.",
      icon: Calendar,
      color: "text-vybz-pink"
    },
    {
      title: "Real-time Notifications",
      description: "Get notified about upcoming events you've wishlisted, new events from your favorite hosts, and last-minute deals.",
      icon: Bell,
      color: "text-vybz-blue"
    },
    {
      title: "Secure Payments",
      description: "Safe and convenient ticket purchasing with our integrated wallet system. Budget and save for upcoming events.",
      icon: CreditCard,
      color: "text-vybz-purple"
    },
    {
      title: "Advanced Search",
      description: "Filter by event type, date, price range, and more. Find exactly what matches your vibe preferences.",
      icon: Search,
      color: "text-vybz-pink"
    },
    {
      title: "Verified Venues",
      description: "All venues and events are verified for authenticity and safety. Enjoy your vibe with peace of mind.",
      icon: Shield,
      color: "text-vybz-blue"
    },
    {
      title: "Mobile-First Design",
      description: "Optimized for mobile devices with offline capabilities. Access your events anywhere, anytime.",
      icon: Smartphone,
      color: "text-vybz-purple"
    },
    {
      title: "International Ready",
      description: "Perfect for tourists and internationals wanting to experience authentic Kenyan vibes and culture.",
      icon: Globe,
      color: "text-vybz-pink"
    }
  ];

  return (
    <section id="features" className="py-20 bg-vybz-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Why Choose <span className="bg-gradient-primary bg-clip-text text-transparent">The Vybz Circle?</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            We've built the ultimate platform to solve all your entertainment discovery problems
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-vybz-surface border-white/20 hover:border-vybz-purple/50 transition-all duration-300 hover:scale-105 group">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;