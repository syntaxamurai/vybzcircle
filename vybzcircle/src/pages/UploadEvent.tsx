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

const UploadEvent = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [county, setCounty] = useState("");
  const [eventType, setEventType] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [ticketsAvailable, setTicketsAvailable] = useState<number | "">("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (
      !title || !date || !venue || !county || !eventType ||
      price === "" || ticketsAvailable === "" || !imageFile
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

    // Simulate backend POST request with image included
    console.log({
      title,
      date,
      venue,
      county,
      eventType,
      description,
      price,
      ticketsAvailable,
      imageFile,
    });

    setSuccess(true);

    // Reset form fields
    setTitle("");
    setDate("");
    setVenue("");
    setCounty("");
    setEventType("");
    setDescription("");
    setPrice("");
    setTicketsAvailable("");
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <div className="min-h-screen bg-vybz-dark">
      <Navigation />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-lg">
          <h1 className="text-4xl font-bold text-white mb-6">Upload New Event</h1>
          <form onSubmit={handleSubmit} className="space-y-6 bg-vybz-surface p-6 rounded-lg">
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">Event uploaded successfully!</p>}

            {/* ... existing inputs ... */}

            <div>
              <label className="block text-white mb-1" htmlFor="title">Event Title *</label>
              <input
                id="title"
                type="text"
                className="w-full px-3 py-2 rounded bg-vybz-dark border border-gray-600 text-white"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-white mb-1" htmlFor="date">Date *</label>
              <input
                id="date"
                type="date"
                className="w-full px-3 py-2 rounded bg-vybz-dark border border-gray-600 text-white"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-white mb-1" htmlFor="venue">Venue *</label>
              <input
                id="venue"
                type="text"
                className="w-full px-3 py-2 rounded bg-vybz-dark border border-gray-600 text-white"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-white mb-1" htmlFor="county">County *</label>
              <select
                id="county"
                className="w-full px-3 py-2 rounded bg-vybz-dark border border-gray-600 text-white"
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

            <div>
              <label className="block text-white mb-1" htmlFor="eventType">Event Type *</label>
              <select
                id="eventType"
                className="w-full px-3 py-2 rounded bg-vybz-dark border border-gray-600 text-white"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                required
              >
                <option value="">Select Type</option>
                <option value="18+">18+</option>
                <option value="family">Family Friendly</option>
              </select>
            </div>

            <div>
              <label className="block text-white mb-1" htmlFor="price">Ticket Price *</label>
              <input
                id="price"
                type="number"
                min={0}
                className="w-full px-3 py-2 rounded bg-vybz-dark border border-gray-600 text-white"
                value={price}
                onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
                required
              />
            </div>

            <div>
              <label className="block text-white mb-1" htmlFor="ticketsAvailable">Tickets Available *</label>
              <input
                id="ticketsAvailable"
                type="number"
                min={0}
                className="w-full px-3 py-2 rounded bg-vybz-dark border border-gray-600 text-white"
                value={ticketsAvailable}
                onChange={(e) => setTicketsAvailable(e.target.value === "" ? "" : Number(e.target.value))}
                required
              />
            </div>

            <div>
              <label className="block text-white mb-1" htmlFor="description">Description (optional)</label>
              <textarea
                id="description"
                className="w-full px-3 py-2 rounded bg-vybz-dark border border-gray-600 text-white"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>

            <div>
              <label className="block text-white mb-1">Event Image *</label>
              <input
                type="file"
                accept="image/*"
                onChange={onImageChange}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-4 rounded max-h-48 object-contain"
                />
              )}
            </div>

            <Button type="submit" className="w-full">Submit Event</Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UploadEvent;
