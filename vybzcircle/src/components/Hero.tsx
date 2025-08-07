import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-vybz-dark/90 via-vybz-purple/50 to-vybz-pink/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Logo/Brand */}
          <div className="space-y-4">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              The Vybz Circle
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 font-light">
              Bringing the vibe close to you
            </p>
          </div>

          {/* Call to Action */}
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white font-semibold">
              What's your vibe?
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="hero" size="lg" className="text-lg px-8 py-4">
                <Sparkles className="mr-2 h-5 w-5" />
                Discover Events
              </Button>
              <Button variant="glass" size="lg" className="text-lg px-8 py-4">
                <Users className="mr-2 h-5 w-5" />
                Join the Circle
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto pt-12">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
              <Calendar className="h-8 w-8 text-vybz-pink mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-sm text-white/80">Events Monthly</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
              <MapPin className="h-8 w-8 text-vybz-blue mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">47</div>
              <div className="text-sm text-white/80">Counties Covered</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
              <Users className="h-8 w-8 text-vybz-purple mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">10K+</div>
              <div className="text-sm text-white/80">Active Users</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
              <Sparkles className="h-8 w-8 text-vybz-pink mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-sm text-white/80">Vibe Discovery</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;