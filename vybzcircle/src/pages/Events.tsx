import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Ticket,
  Heart,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

type EventType = "all" | "18+" | "family";
type FilterType = "date" | "location" | "eventType";

interface Event {
  id: number;
  date: Date; // full date
  title: string;
  venue: string;
  type: EventType;
  county: string; // add county for location filter
  ticketPrice: number; // new
  ticketsAvailable: number; // new
}

const countiesKenya = [
  "Mombasa",
  "Kwale",
  "Kilifi",
  "Tana River",
  "Lamu",
  "Taita-Taveta",
  "Garissa",
  "Wajir",
  "Mandera",
  "Marsabit",
  "Isiolo",
  "Meru",
  "Tharaka-Nithi",
  "Embu",
  "Kitui",
  "Machakos",
  "Makueni",
  "Nyandarua",
  "Nyeri",
  "Kirinyaga",
  "Murang'a",
  "Kiambu",
  "Turkana",
  "West Pokot",
  "Samburu",
  "Trans-Nzoia",
  "Uasin Gishu",
  "Elgeyo Marakwet",
  "Nandi",
  "Baringo",
  "Laikipia",
  "Nakuru",
  "Narok",
  "Kajiado",
  "Kericho",
  "Bomet",
  "Kakamega",
  "Vihiga",
  "Bungoma",
  "Busia",
  "Siaya",
  "Kisumu",
  "Homa Bay",
  "Migori",
  "Kisii",
  "Nyamira",
  "Nairobi",
];

const Events = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [cart, setCart] = useState<(Event & { quantity: number })[]>([]);
  const [wishlist, setWishlist] = useState<Event[]>([]);
  const [ticketsSold, setTicketsSold] = useState<Record<number, number>>({});
  const navigate = useNavigate();

  // Single filter dropdown state
  const [filterType, setFilterType] = useState<FilterType>("date");

  // Filter values
  const [filterDate, setFilterDate] = useState<Date | null>(null);
  const [filterLocation, setFilterLocation] = useState<string>("");
  const [filterEventType, setFilterEventType] = useState<EventType>("all");

  // Dropdown open states
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [eventTypeDropdownOpen, setEventTypeDropdownOpen] = useState(false);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Mock events with full dates, counties, ticket info
  const mockEvents: Event[] = [
    {
      id: 1,
      date: new Date(2025, 7, 15),
      title: "Summer Music Festival",
      venue: "Uhuru Gardens",
      type: "all",
      county: "Nairobi",
      ticketPrice: 1200,
      ticketsAvailable: 100,
    },
    {
      id: 2,
      date: new Date(2025, 7, 22),
      title: "Comedy Night",
      venue: "Carnivore Grounds",
      type: "18+",
      county: "Nairobi",
      ticketPrice: 800,
      ticketsAvailable: 50,
    },
    {
      id: 3,
      date: new Date(2025, 7, 28),
      title: "Art Exhibition",
      venue: "Kenya National Theatre",
      type: "family",
      county: "Nairobi",
      ticketPrice: 500,
      ticketsAvailable: 30,
    },
  ];

  // Load cart, wishlist and ticketsSold from localStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);

    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(storedWishlist);

    const storedSold = JSON.parse(localStorage.getItem("ticketsSold") || "{}");
    setTicketsSold(storedSold);
  }, []);

  // Save cart and wishlist to localStorage
  const saveCart = (updatedCart: (Event & { quantity: number })[]) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const saveWishlist = (updatedWishlist: Event[]) => {
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const saveTicketsSold = (updatedSold: Record<number, number>) => {
    setTicketsSold(updatedSold);
    localStorage.setItem("ticketsSold", JSON.stringify(updatedSold));
  };

  // Add ticket to cart & update sold tickets count
  const addToCart = (event: Event) => {
    const sold = ticketsSold[event.id] || 0;

    if (sold >= event.ticketsAvailable) {
      alert("Sorry, tickets for this event are sold out.");
      return;
    }

    // Update cart quantity
    const exists = cart.find((item) => item.id === event.id);
    let updatedCart;
    if (exists) {
      updatedCart = cart.map((item) =>
        item.id === event.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...event, quantity: 1 }];
    }
    saveCart(updatedCart);

    // Update tickets sold count
    const updatedSold = {
      ...ticketsSold,
      [event.id]: sold + 1,
    };
    saveTicketsSold(updatedSold);
  };

  const toggleWishlist = (event: Event) => {
    if (wishlist.some((item) => item.id === event.id)) {
      const updatedWishlist = wishlist.filter((item) => item.id !== event.id);
      saveWishlist(updatedWishlist);
    } else {
      const updatedWishlist = [...wishlist, event];
      saveWishlist(updatedWishlist);
    }
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  // --- Calendar grid logic ---

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const calendarDays = useMemo(() => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    return days;
  }, [firstDayOfMonth, daysInMonth]);

  const filteredEvents = useMemo(() => {
    return mockEvents.filter((event) => {
      if (filterType === "date" && filterDate) {
        return (
          event.date.getFullYear() === filterDate.getFullYear() &&
          event.date.getMonth() === filterDate.getMonth() &&
          event.date.getDate() === filterDate.getDate()
        );
      }

      if (filterType === "location" && filterLocation) {
        return (
          event.county.toLowerCase() === filterLocation.toLowerCase() ||
          event.venue.toLowerCase().includes(filterLocation.toLowerCase())
        );
      }

      if (filterType === "eventType" && filterEventType !== "all") {
        return event.type === filterEventType;
      }

      return true;
    });
  }, [mockEvents, filterType, filterDate, filterLocation, filterEventType]);

  const handleDayClick = (day: number | null) => {
    if (day === null) return;
    const clickedDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    setFilterType("date");
    setFilterDate(clickedDate);
    setFilterDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-vybz-dark">
      <Navigation />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Events</h1>
            <p className="text-vybz-light text-lg">
              Discover amazing events happening around you
            </p>
          </div>

          {/* Single filter dropdown */}
          <div className="relative w-full max-w-md mx-auto mb-8">
            <button
              onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
              className="w-full flex justify-between items-center px-4 py-2 rounded-md border border-gray-600 bg-vybz-surface text-white focus:outline-none focus:ring-2 focus:ring-vybz-primary"
              aria-expanded={filterDropdownOpen}
            >
              Filter by:{" "}
              <span className="font-semibold capitalize">{filterType}</span>
              {filterDropdownOpen ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>

            {filterDropdownOpen && (
              <ul className="absolute z-20 w-full bg-vybz-surface border border-gray-600 rounded-md mt-1 shadow-lg">
                <li
                  className="cursor-pointer px-4 py-2 hover:bg-vybz-primary/80"
                  onClick={() => {
                    setFilterType("date");
                    setFilterDropdownOpen(false);
                  }}
                >
                  Date
                </li>
                <li
                  className="cursor-pointer px-4 py-2 hover:bg-vybz-primary/80"
                  onClick={() => {
                    setFilterType("location");
                    setFilterDropdownOpen(false);
                    setLocationDropdownOpen(false);
                  }}
                >
                  Location
                </li>
                <li
                  className="cursor-pointer px-4 py-2 hover:bg-vybz-primary/80"
                  onClick={() => {
                    setFilterType("eventType");
                    setFilterDropdownOpen(false);
                    setEventTypeDropdownOpen(false);
                  }}
                >
                  Event Type
                </li>
              </ul>
            )}
          </div>

          {/* Conditional filter UI */}
          <div className="mb-8 max-w-md mx-auto">
            {filterType === "date" && (
              <div className="bg-vybz-surface rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
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

                <div className="grid grid-cols-7 gap-2 text-center mb-4">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <div
                        key={day}
                        className="text-vybz-light font-semibold p-2 select-none"
                      >
                        {day}
                      </div>
                    )
                  )}
                  {calendarDays.map((day, idx) => {
                    if (day === null) {
                      return (
                        <div
                          key={"empty" + idx}
                          className="aspect-square text-vybz-surface cursor-default"
                        ></div>
                      );
                    }
                    const isSelected =
                      filterDate &&
                      day === filterDate.getDate() &&
                      currentMonth.getMonth() === filterDate.getMonth() &&
                      currentMonth.getFullYear() === filterDate.getFullYear();

                    const hasEvent = mockEvents.some(
                      (e) =>
                        e.date.getDate() === day &&
                        e.date.getMonth() === currentMonth.getMonth() &&
                        e.date.getFullYear() === currentMonth.getFullYear()
                    );

                    return (
                      <button
                        key={day}
                        onClick={() => handleDayClick(day)}
                        className={`aspect-square rounded cursor-pointer transition-colors
                          ${
                            isSelected
                              ? "bg-vybz-primary text-white font-bold"
                              : hasEvent
                              ? "bg-vybz-primary/50 text-white"
                              : "text-vybz-light hover:bg-vybz-surface"
                          }
                        `}
                        type="button"
                        aria-pressed={isSelected}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {filterType === "location" && (
              <div className="relative">
                <button
                  onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
                  className="w-full flex justify-between items-center px-4 py-2 rounded-md border border-gray-600 bg-vybz-surface text-white focus:outline-none focus:ring-2 focus:ring-vybz-primary"
                  aria-expanded={locationDropdownOpen}
                >
                  {filterLocation || "Select County"}
                  {locationDropdownOpen ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
                {locationDropdownOpen && (
                  <ul className="absolute z-20 max-h-60 overflow-auto w-full bg-vybz-surface border border-gray-600 rounded-md mt-1 shadow-lg">
                    {countiesKenya.map((county) => (
                      <li
                        key={county}
                        className="cursor-pointer px-4 py-2 hover:bg-vybz-primary/80"
                        onClick={() => {
                          setFilterLocation(county);
                          setLocationDropdownOpen(false);
                        }}
                      >
                        {county}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {filterType === "eventType" && (
              <div className="relative max-w-xs">
                <button
                  onClick={() => setEventTypeDropdownOpen(!eventTypeDropdownOpen)}
                  className="w-full flex justify-between items-center px-4 py-2 rounded-md border border-gray-600 bg-vybz-surface text-white focus:outline-none focus:ring-2 focus:ring-vybz-primary"
                  aria-expanded={eventTypeDropdownOpen}
                >
                  {filterEventType === "all"
                    ? "Select Event Type"
                    : filterEventType === "18+"
                    ? "18+"
                    : "Family Friendly"}
                  {eventTypeDropdownOpen ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>

                {eventTypeDropdownOpen && (
                  <ul className="absolute z-20 w-full bg-vybz-surface border border-gray-600 rounded-md mt-1 shadow-lg">
                    <li
                      className="cursor-pointer px-4 py-2 hover:bg-vybz-primary/80"
                      onClick={() => {
                        setFilterEventType("all");
                        setEventTypeDropdownOpen(false);
                      }}
                    >
                      All
                    </li>
                    <li
                      className="cursor-pointer px-4 py-2 hover:bg-vybz-primary/80"
                      onClick={() => {
                        setFilterEventType("18+");
                        setEventTypeDropdownOpen(false);
                      }}
                    >
                      18+
                    </li>
                    <li
                      className="cursor-pointer px-4 py-2 hover:bg-vybz-primary/80"
                      onClick={() => {
                        setFilterEventType("family");
                        setEventTypeDropdownOpen(false);
                      }}
                    >
                      Family Friendly
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Display filtered events */}
          <div className="space-y-6 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Upcoming Events</h2>
            {filteredEvents.length === 0 ? (
              <p className="text-vybz-light text-center">
                No events found matching your filter.
              </p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => {
                  const sold = ticketsSold[event.id] || 0;
                  const soldPercent = Math.min(
                    100,
                    Math.round((sold / event.ticketsAvailable) * 100)
                  );
                  return (
                    <div
                      key={event.id}
                      className="bg-vybz-surface rounded-lg overflow-hidden"
                    >
                      <div className="h-48 bg-gradient-to-br from-vybz-primary to-vybz-accent"></div>
                      <div className="p-6">
                        <h3 className="text-white font-semibold text-lg mb-2">
                          {event.title}
                        </h3>
                        <p className="text-vybz-light mb-2 flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {event.venue} - {event.county}
                        </p>
                        <p className="text-vybz-light mb-1">
                          Date:{" "}
                          {event.date.toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                        <p className="text-vybz-light mb-2">
                          Price: KES {event.ticketPrice.toLocaleString()}
                        </p>
                        <p className="text-vybz-light mb-4">
                          Tickets Sold: {sold} / {event.ticketsAvailable} (
                          {soldPercent}%)
                        </p>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={() => addToCart(event)}
                            disabled={sold >= event.ticketsAvailable}
                            title={
                              sold >= event.ticketsAvailable
                                ? "Sold Out"
                                : "Buy Ticket"
                            }
                          >
                            <Ticket className="w-4 h-4 mr-2" />
                            {sold >= event.ticketsAvailable
                              ? "Sold Out"
                              : "Buy Ticket"}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleWishlist(event)}
                          >
                            <Heart
                              className={`w-4 h-4 ${
                                wishlist.some((item) => item.id === event.id)
                                  ? "text-green-500 fill-green-500"
                                  : "text-vybz-light"
                              }`}
                            />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
