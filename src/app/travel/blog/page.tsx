
import { Navbar } from "@/components/navbar";
import { TravelFooter } from "@/components/travel-footer";
import Image from "next/image";
import Link from "next/link";

export default function BlogPage() {
  return (
    <>
      <Navbar/>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Featured Story</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-[400px]">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex gap-2 mb-4">
                {featuredPost.categories.map((category, index) => (
                  <span
                    key={index}
                    className="text-sm px-3 py-1 bg-blue-100 text-blue-600 rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>
              <h3 className="text-3xl font-bold mb-4">{featuredPost.title}</h3>
              <p className="text-gray-600 mb-4">{featuredPost.excerpt}</p>
              <div className="flex items-center gap-4 mb-6">
                <Image
                  src={featuredPost.author.avatar}
                  alt={featuredPost.author.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold">{featuredPost.author.name}</p>
                  <p className="text-sm text-gray-500">{featuredPost.date}</p>
                </div>
              </div>
              <Link
                href={`/travel/blog/${featuredPost.slug}`}
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors inline-block w-fit"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              className="px-4 py-2 rounded-full border border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-colors"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Latest Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article key={index} className="group">
              <Link href={`/travel/blog/${post.slug}`}>
                <div className="relative h-[240px] mb-4">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex gap-2 mb-3">
                  {post.categories.map((category, catIndex) => (
                    <span
                      key={catIndex}
                      className="text-sm px-3 py-1 bg-gray-100 rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-3">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <div className="text-sm">
                    <p className="font-medium">{post.author.name}</p>
                    <p className="text-gray-500">{post.date}</p>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>

      <TravelFooter />
    </>
  );
}

// Sample Data
const featuredPost = {
  title: "Hidden Gems of the Amalfi Coast",
  slug: "hidden-gems-amalfi-coast",
  excerpt: "Discover the secret spots and local favorites along Italy's most beautiful coastline. From hidden beaches to family-run restaurants, we'll show you how to experience the Amalfi Coast like a local.",
  image: "/blog/amalfi-coast.jpg",
  categories: ["Europe", "Travel Guide"],
  author: {
    name: "Elena Romano",
    avatar: "/authors/elena.jpg"
  },
  date: "April 15, 2024"
};

const categories = [
  "All Posts",
  "Travel Tips",
  "Destinations",
  "Adventure",
  "Food & Culture",
  "Budget Travel",
  "Luxury Travel",
  "Photography"
];

const posts = [
  {
    title: "10 Must-Try Street Foods in Bangkok",
    slug: "bangkok-street-food-guide",
    excerpt: "From pad thai to mango sticky rice, discover the best street food spots in Bangkok.",
    image: "/blog/bangkok-food.jpg",
    categories: ["Food & Culture", "Asia"],
    author: {
      name: "Mike Chen",
      avatar: "/authors/mike.jpg"
    },
    date: "April 12, 2024"
  },
  {
    title: "Ultimate Guide to Hiking in Patagonia",
    slug: "patagonia-hiking-guide",
    excerpt: "Everything you need to know about planning your Patagonian adventure.",
    image: "/blog/patagonia.jpg",
    categories: ["Adventure", "South America"],
    author: {
      name: "Sarah Thompson",
      avatar: "/authors/sarah.jpg"
    },
    date: "April 10, 2024"
  },
  {
    title: "Best Photography Spots in Santorini",
    slug: "santorini-photography-guide",
    excerpt: "Capture the perfect sunset and iconic blue domes with our photography guide.",
    image: "/blog/santorini.jpg",
    categories: ["Photography", "Europe"],
    author: {
      name: "David Kim",
      avatar: "/authors/david.jpg"
    },
    date: "April 8, 2024"
  },
  {
    title: "Budget Travel: Southeast Asia",
    slug: "southeast-asia-budget-guide",
    excerpt: "How to explore Southeast Asia on less than $50 a day.",
    image: "/blog/southeast-asia.jpg",
    categories: ["Budget Travel", "Asia"],
    author: {
      name: "Lisa Wong",
      avatar: "/authors/lisa.jpg"
    },
    date: "April 6, 2024"
  },
  {
    title: "Luxury Safari Experience in Tanzania",
    slug: "tanzania-safari-guide",
    excerpt: "The ultimate guide to planning a luxury safari in the Serengeti.",
    image: "/blog/safari.jpg",
    categories: ["Luxury Travel", "Africa"],
    author: {
      name: "James Wilson",
      avatar: "/authors/james.jpg"
    },
    date: "April 4, 2024"
  },
  {
    title: "Hidden Beaches of Portugal",
    slug: "portugal-beaches-guide",
    excerpt: "Discover secluded beaches along Portugal's stunning coastline.",
    image: "/blog/portugal.jpg",
    categories: ["Destinations", "Europe"],
    author: {
      name: "Maria Silva",
      avatar: "/authors/maria.jpg"
    },
    date: "April 2, 2024"
  }
];