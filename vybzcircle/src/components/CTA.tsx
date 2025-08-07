import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, ArrowRight, Bell } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border border-white rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 border border-white rounded-full animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 border border-white rounded-full animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-40 right-1/3 w-24 h-24 border border-white rounded-full animate-pulse animation-delay-3000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Ready to Find Your Vibe?
          </h2>
          
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join thousands of vibe seekers already discovering the best entertainment Kenya has to offer. 
            Your next unforgettable experience is just a tap away.
          </p>

          {/* Email Signup */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex gap-4">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 backdrop-blur-md"
              />
              <Button variant="glass" size="lg">
                <Bell className="h-5 w-5 mr-2" />
                Notify Me
              </Button>
            </div>
            <p className="text-sm text-white/70 mt-2">
              Be the first to know when we launch in your area
            </p>
          </div>

          {/* Main CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button variant="glass" size="lg" className="text-lg px-8 py-4 border-2 border-white/30">
              <Sparkles className="mr-2 h-5 w-5" />
              Download App
            </Button>
            <Button variant="hero" size="lg" className="text-lg px-8 py-4 bg-white text-vybz-purple hover:bg-white/90">
              Explore Web Version
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-sm text-white/80">Events Monthly</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">47</div>
              <div className="text-sm text-white/80">Counties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">10K+</div>
              <div className="text-sm text-white/80">Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-sm text-white/80">Discovery</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;