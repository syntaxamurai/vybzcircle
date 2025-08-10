import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Clubs from "./pages/Clubs";
import Events from "./pages/Events";
import UploadEvent from "./pages/UploadEvent";
import Hosts from "./pages/Hosts";
import Brands from "./pages/Brands";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Navigation from "./components/Navigation";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/Profile";
import Payment from "@/pages/Payment";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/events" element={<Events />} />
            <Route path="/upload-event" element={<UploadEvent />} />
            <Route path="/hosts" element={<Hosts />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/profile" element={<ProfilePage />} />
            {/* Catch-all for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
