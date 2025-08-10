import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MapPin, Trash, Plus, Minus } from "lucide-react";

const CartPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"cart" | "wishlist">("cart");
  const [cart, setCart] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);

  // Load from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setCart(storedCart);
    setWishlist(storedWishlist);
  }, []);

  // Save cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Save wishlist changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const increaseQuantity = (id: string) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQuantity = (id: string) => {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity - 1) }
        : item
    ));
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const removeFromWishlist = (id: string) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  const moveToCart = (event: any) => {
    const existing = cart.find(item => item.id === event.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === event.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...event, quantity: 1 }]);
    }
    removeFromWishlist(event.id);
    setTab("cart");
  };

  return (
    <div className="min-h-screen bg-vybz-dark p-6 text-white pt-20">
      {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
        <Button variant="outline" onClick={() => navigate("/events")}>
          ← Back to Events
        </Button>

        <div className="flex gap-2">
          <Button
            variant={tab === "cart" ? "default" : "outline"}
            onClick={() => setTab("cart")}
          >
            Cart
          </Button>
          
          <Button
            variant={tab === "wishlist" ? "default" : "outline"}
            onClick={() => setTab("wishlist")}
          >
            Wishlist
          </Button>
        </div>
      </div>


      {/* CART */}
      {tab === "cart" && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
          {cart.length === 0 ? (
            <p className="text-vybz-light">No tickets in cart.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cart.map((event) => (
                <div
                  key={event.id}
                  className="bg-vybz-surface rounded-lg overflow-hidden flex flex-col"
                >
                  <div className="h-48 bg-gradient-to-br from-vybz-primary to-vybz-accent"></div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                    <p className="text-vybz-light mb-4 flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> {event.venue}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mb-4">
                      <Button size="sm" variant="outline" onClick={() => decreaseQuantity(event.id)}>
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="px-3">{event.quantity}</span>
                      <Button size="sm" variant="outline" onClick={() => increaseQuantity(event.id)}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Checkout & Delete for this event */}
                    <div className="flex items-center justify-between mt-auto">
                      <Button
                        className="bg-vybz-primary text-white flex-1 mr-2"
                        onClick={() => navigate("/payment", { state: { event } })}
                      >
                        Checkout
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => removeFromCart(event.id)}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* WISHLIST */}
      {tab === "wishlist" && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
          {wishlist.length === 0 ? (
            <p className="text-vybz-light">No events in wishlist.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wishlist.map((event) => (
                <div
                  key={event.id}
                  className="bg-vybz-surface rounded-lg overflow-hidden"
                >
                  <div className="h-48 bg-gradient-to-br from-vybz-primary to-vybz-accent"></div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                    <p className="text-vybz-light mb-4 flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> {event.venue}
                    </p>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => moveToCart(event)}
                      >
                        Move to Cart
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeFromWishlist(event.id)}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CartPage;
