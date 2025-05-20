import { TravelNavbar } from "@/components/travel-navbar";
import { TravelFooter } from "@/components/travel-footer";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function DestinationsPage() {
  return (
    <>
      <TravelNavbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Input
            type="search"
            placeholder="Search destinations..."
            className="md:w-[300px]"
          />
          <select className="p-2 border rounded-md">
            <option value="">All Regions</option>
            <option value="europe">Europe</option>
            <option value="asia">Asia</option>
            <option value="americas">Americas</option>
            <option value="africa">Africa</option>
            <option value="oceania">Oceania</option>
          </select>
          <select className="p-2 border rounded-md">
            <option value="">All Experiences</option>
            <option value="beach">Beach</option>
            <option value="mountain">Mountain</option>
            <option value="city">City</option>
            <option value="cultural">Cultural</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination, index) => (
            <Link 
              href={`/travel/destinations/${destination.slug}`} 
              key={index}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg">
                <div className="relative h-[300px]">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="absolute bottom-0 p-4 text-white">
                  <h3 className="text-xl font-semibold mb-2">{destination.name}</h3>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center">
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {destination.duration}
                    </span>
                    <span className="flex items-center">
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex gap-2">
                  {destination.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="text-xs px-2 py-1 bg-gray-100 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>


      <section className="bg-brand-25 py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Experiences</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {experiences.map((experience, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  {experience.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{experience.title}</h3>
                <p className="text-gray-600">{experience.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TravelFooter />
    </>
  );
}

// Sample data
const destinations = [
  {
    name: "Santorini, Greece",
    slug: "santorini-greece",
    image: "/santorini.jpg",
    duration: "5-7 days",
    price: 1299,
    tags: ["Beach", "Romantic", "Cultural"]
  },
  {
    name: "Kyoto, Japan",
    slug: "kyoto-japan",
    image: "/kyoto.jpg",
    duration: "7-10 days",
    price: 1599,
    tags: ["Cultural", "Historical", "Food"]
  },
  {
    name: "Machu Picchu, Peru",
    slug: "machu-picchu-peru",
    image: "/machu-picchu.jpg",
    duration: "4-6 days",
    price: 999,
    tags: ["Adventure", "Historical", "Nature"]
  },
  {
    name: "Maldives",
    slug: "maldives",
    image: "/maldives.jpg",
    duration: "6-8 days",
    price: 1899,
    tags: ["Luxury", "Beach", "Relaxation"]
  },
  {
    name: "Swiss Alps",
    slug: "swiss-alps",
    image: "/swiss-alps.jpg",
    duration: "5-7 days",
    price: 1499,
    tags: ["Mountain", "Adventure", "Nature"]
  },
  {
    name: "Dubai, UAE",
    slug: "dubai-uae",
    image: "/dubai.jpg",
    duration: "4-6 days",
    price: 1399,
    tags: ["Luxury", "Modern", "Shopping"]
  }
];

const experiences = [
  {
    icon: <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /></svg>,
    title: "Luxury Stays",
    description: "Experience world-class accommodations"
  },
  {
    icon: <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    title: "Adventure Tours",
    description: "Exciting activities and guided tours"
  },
  {
    icon: <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" /></svg>,
    title: "Cultural Experiences",
    description: "Immerse in local traditions"
  },
  {
    icon: <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    title: "Best Value",
    description: "Competitive prices guaranteed"
  }
];