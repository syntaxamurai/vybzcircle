import { useState, ChangeEvent } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const countiesKenya = [
  "Mombasa", "Kwale", "Kilifi", "Tana River", "Lamu", "Taita-Taveta",
  "Garissa", "Wajir", "Mandera", "Marsabit", "Isiolo", "Meru",
  "Tharaka-Nithi", "Embu", "Kitui", "Machakos", "Makueni", "Nyandarua",
  "Nyeri", "Kirinyaga", "Murang'a", "Kiambu", "Turkana", "West Pokot",
  "Samburu", "Trans-Nzoia", "Uasin Gishu", "Elgeyo Marakwet", "Nandi",
  "Baringo", "Laikipia", "Nakuru", "Narok", "Kajiado", "Kericho", "Bomet",
  "Kakamega", "Vihiga", "Bungoma", "Busia", "Siaya", "Kisumu", "Homa Bay",
  "Migori", "Kisii", "Nyamira", "Nairobi"
];

const eventCategories = [
  "Music & Entertainment",
  "Comedy & Entertainment", 
  "Arts & Culture",
  "Sports & Recreation",
  "Business & Professional",
  "Food & Drink",
  "Health & Wellness",
  "Technology",
  "Education",
  "Community & Social",
  "Fashion & Beauty",
  "Travel & Outdoor",
  "Other"
];

type EventType = "all" | "18+" | "family";

const UploadEvent = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [county, setCounty] = useState("");
  const [eventType, setEventType] = useState<EventType | "">("");
  const [category, setCategory] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [ticketsAvailable, setTicketsAvailable] = useState<number | "">("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }
    setError("");
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    // Clean up the object URL to prevent memory leaks
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImageFile(null);
    setImagePreview(null);
    // Clear the file input
    const fileInput = document.getElementById('imageInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubmit = (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    setError("");
    setSuccess(false);

    // Required field validation
    if (
      !title || !date || !time || !venue || !county || !eventType ||
      !category || !organizer || price === "" || ticketsAvailable === "" || !imageFile
    ) {
      setError("Please fill in all required fields and upload an image.");
      return;
    }

    if (price <= 0) {
      setError("Price must be greater than zero.");
      return;
    }

    if (ticketsAvailable <= 0) {
      setError("Number of tickets available must be greater than zero.");
      return;
    }

    // Combine date and time directly (time input already in 24-hour format)
    const eventDateTime = new Date(`${date}T${time}`);
    
    // Check if the event date is in the future
    if (eventDateTime <= new Date()) {
      setError("Event date and time must be in the future.");
      return;
    }

    // Simulate backend POST request with all event data
    const eventData = {
      title,
      date: eventDateTime,
      venue,
      county,
      type: eventType,
      category,
      organizer,
      description,
      ticketPrice: price,
      ticketsAvailable,
      imageFile,
    };

    console.log("Event data to be submitted:", eventData);

    // Clean up image preview URL
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    // Show success modal instead of inline success message
    setShowSuccessModal(true);

    // Reset form fields
    setTitle("");
    setDate("");
    setTime("");
    setVenue("");
    setCounty("");
    setEventType("");
    setCategory("");
    setOrganizer("");
    setDescription("");
    setPrice("");
    setTicketsAvailable("");
    setImageFile(null);
    setImagePreview(null);
  };

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-900">
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Upload New Event</h1>
            <p className="text-gray-300 text-lg">
              Share your amazing event with the community
            </p>
          </div>

          <div className="space-y-6 bg-gray-800 p-8 rounded-lg shadow-lg">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <p className="text-red-400">{error}</p>
              </div>
            )}

            {/* Event Basic Information */}
            <div className="grid md:grid-cols-1 gap-6">
              <div>
                <label className="block text-white mb-2 font-medium" htmlFor="title">
                  Event Title *
                </label>
                <input
                  id="title"
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter event title"
                  required
                />
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white mb-2 font-medium" htmlFor="date">
                  Event Date *
                </label>
                <input
                  id="date"
                  type="date"
                  min={today}
                  className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2 font-medium" htmlFor="time">
                  Event Time *
                </label>
                <input
                  id="time"
                  type="time"
                  step="60"
                  className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all [&::-webkit-calendar-picker-indicator]:invert"
                  value={time}
                  onChange={(e) => {
                    // Convert to 12-hour format display but keep 24-hour value
                    setTime(e.target.value);
                  }}
                  required
                />
              </div>
            </div>

            {/* Venue and Location */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white mb-2 font-medium" htmlFor="venue">
                  Venue *
                </label>
                <input
                  id="venue"
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder="Enter venue name"
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2 font-medium" htmlFor="county">
                  County *
                </label>
                <select
                  id="county"
                  className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={county}
                  onChange={(e) => setCounty(e.target.value)}
                  required
                >
                  <option value="">Select County</option>
                  {countiesKenya.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Event Type and Category */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white mb-2 font-medium" htmlFor="eventType">
                  Event Type *
                </label>
                <select
                  id="eventType"
                  className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value as EventType)}
                  required
                >
                  <option value="">Select Event Type</option>
                  <option value="all">All Ages</option>
                  <option value="18+">18+ Only</option>
                  <option value="family">Family Friendly</option>
                </select>
              </div>

              <div>
                <label className="block text-white mb-2 font-medium" htmlFor="category">
                  Category *
                </label>
                <select
                  id="category"
                  className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  {eventCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Organizer */}
            <div>
              <label className="block text-white mb-2 font-medium" htmlFor="organizer">
                Organizer *
              </label>
              <input
                id="organizer"
                type="text"
                className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                value={organizer}
                onChange={(e) => setOrganizer(e.target.value)}
                placeholder="Enter organizer name or company"
                required
              />
            </div>

            {/* Pricing and Tickets */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white mb-2 font-medium" htmlFor="price">
                  Ticket Price (KES) *
                </label>
                <input
                  id="price"
                  type="number"
                  min="1"
                  step="1"
                  className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={price}
                  onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
                  placeholder="0"
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2 font-medium" htmlFor="ticketsAvailable">
                  Tickets Available *
                </label>
                <input
                  id="ticketsAvailable"
                  type="number"
                  min="1"
                  step="1"
                  className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={ticketsAvailable}
                  onChange={(e) => setTicketsAvailable(e.target.value === "" ? "" : Number(e.target.value))}
                  placeholder="0"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-white mb-2 font-medium" htmlFor="description">
                Event Description *
              </label>
              <textarea
                id="description"
                className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-vertical"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                placeholder="Provide detailed information about your event, what attendees can expect, special features, etc."
                required
              />
            </div>

            {/* Event Image */}
            <div>
              <label className="block text-white mb-2 font-medium">
                Event Image *
              </label>
              
              {!imagePreview ? (
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                  <input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    onChange={onImageChange}
                    className="w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600 file:cursor-pointer cursor-pointer transition-colors"
                    required
                  />
                  <p className="text-gray-400 text-sm mt-2">
                    Upload a high-quality image that represents your event (JPG, PNG, GIF)
                  </p>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Event preview"
                    className="w-full max-h-64 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors shadow-lg"
                    title="Remove image"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                  <div className="mt-3 text-center">
                    <label htmlFor="imageInput" className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors">
                      Change Image
                    </label>
                    <input
                      id="imageInput"
                      type="file"
                      accept="image/*"
                      onChange={onImageChange}
                      className="hidden"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button 
                onClick={handleSubmit}
                className="w-full py-4 text-lg font-semibold bg-green-500 hover:bg-green-600 transition-colors text-white rounded-lg"
              >
                Submit Event for Review
              </button>
              <p className="text-gray-400 text-sm text-center mt-2">
                Your event will be reviewed and published within 24 hours
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Success!</h3>
              <p className="text-gray-300 text-lg">
                Event shared to Vybz Circle
              </p>
            </div>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadEvent;