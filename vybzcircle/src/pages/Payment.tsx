import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

// Define proper interfaces for type safety
interface CartItem {
  id: string | number; // Allow both string and number IDs
  quantity: number;
  // Add other properties as needed
}

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const event = location.state?.event;

  // Get cart and clearCart from context
  const { cart, removeFromCart, clearCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [showToast, setShowToast] = useState(false);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <p className="text-white">No event selected for payment.</p>
      </div>
    );
  }

  const ticketPrice = event.price ?? 1000;
  const quantity = event.quantity ?? 1;
  const subtotal = ticketPrice * quantity;

  const discount = coupon.toLowerCase() === "vybz10" ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  // Helper to load ticketsSold from localStorage with proper typing
  const loadTicketsSold = (): Record<string, number> => {
    if (typeof window === "undefined") return {};
    const stored = localStorage.getItem("ticketsSold");
    return stored ? JSON.parse(stored) : {};
  };

  // Helper to save ticketsSold to localStorage with proper typing
  const saveTicketsSold = (data: Record<string, number>) => {
    if (typeof window === "undefined") return;
    localStorage.setItem("ticketsSold", JSON.stringify(data));
  };

  const handlePayment = async () => {
    setLoading(true);

    // Simulate async payment processing
    await new Promise((r) => setTimeout(r, 2000));

    // Update ticketsSold only AFTER payment succeeds
    const ticketsSold = loadTicketsSold();

    // Update ticketsSold counts for all items in cart with proper typing
    cart.forEach((cartItem: CartItem) => {
      const itemId = String(cartItem.id); // Convert to string for consistent indexing
      ticketsSold[itemId] = (ticketsSold[itemId] || 0) + cartItem.quantity;
    });

    saveTicketsSold(ticketsSold);

    // Clear the cart after payment success
    clearCart();

    setLoading(false);
    setPaid(true);

    // Show email sent toast
    setShowToast(true);

    // Hide toast after 3 seconds
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-vybz-dark p-20 text-white pt-20 max-w-md mx-auto relative">
      {/* Close button */}
      <button
        className="absolute top-20 right-6 text-white hover:text-vybz-pink"
        onClick={() => navigate("/cart")}
        aria-label="Cancel payment and go back to cart"
      >
        <X className="w-6 h-6" />
      </button>

      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {paid ? (
        <div className="text-center">
          <p className="text-2xl mb-4 text-vybz-pink">Payment Successful!</p>
          <Button onClick={() => navigate("/events")}>Back to Events</Button>
        </div>
      ) : (
        <>
          <div className="bg-vybz-surface rounded p-4 mb-6 relative">
            <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
            <p className="mb-1">Tickets: {quantity}</p>
            <p className="mb-1">Price per ticket: KES {ticketPrice.toLocaleString()}</p>
            <p className="mb-1">Subtotal: KES {subtotal.toLocaleString()}</p>
            {discount > 0 && (
              <p className="mb-1 text-green-400">Discount: -KES {discount.toLocaleString()}</p>
            )}
            <p className="font-bold text-lg mt-4">Total: KES {total.toLocaleString()}</p>
          </div>

          <div className="mb-4">
            <label htmlFor="coupon" className="block mb-1">
              Coupon Code
            </label>
            <input
              id="coupon"
              type="text"
              placeholder="Enter coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="w-full rounded border border-gray-600 p-2 text-black"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="paymentMethod" className="block mb-1">
              Select Payment Method
            </label>
            <select
              id="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full rounded border border-gray-600 p-2 text-black"
            >
              <option value="mpesa">Mpesa</option>
              <option value="airtelmoney">Airtel Money</option>
              <option value="card">Debit/Credit Card</option>
            </select>
          </div>

          <Button onClick={handlePayment} disabled={loading} className="w-full">
            {loading ? "Processing Payment..." : "Pay Now"}
          </Button>
        </>
      )}

      {/* Toast notification */}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-vybz-pink text-white px-6 py-3 rounded shadow-lg z-50">
          Ticket successfully sent to your email!
        </div>
      )}
    </div>
  );
};

export default Payment;