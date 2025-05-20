
import { TravelFooter } from "@/components/travel-footer";
import Image from "next/image";
import { Navbar } from "@/components/navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar/>
      <section className="py-16 px-4 max-w-7xl mx-auto bg-brand-25">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2024, TourAI emerged from a simple yet powerful idea: to make travel 
              planning smarter and more personalized through artificial intelligence.
            </p>
            <p className="text-gray-600">
              What started as a small team of travel enthusiasts and tech innovators has grown 
              into a platform that helps thousands of travelers create unforgettable experiences.
            </p>
          </div>
          <div className="relative h-[400px]">
            <Image
              src="/our-story.png" 
              alt="Our Story"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-brand-25 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Mission & Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto bg-brand-25">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TravelFooter />
    </>
  );
}

const values = [
  {
    icon: <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    title: "Innovation",
    description: "We leverage cutting-edge AI technology to revolutionize the way people plan and experience travel."
  },
  {
    icon: <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    title: "Personalization",
    description: "We believe every traveler is unique, and their experiences should reflect their individual preferences."
  },
  {
    icon: <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>,
    title: "Sustainability",
    description: "We promote responsible tourism and work to minimize the environmental impact of travel."
  }
];

const team = [
  {
    name: "Rohan",
    role: "CEO & Founder",
    image: "/person1.png" // Add team member images to public/team folder
  },
  {
    name: "Pranav Tvade",
    role: "CTO",
    image: "/person2.png"
  },
  {
    name: "Pratik Patil",
    role: "Head of Operations",
    image: "/person3.png"
  },
  {
    name: "Rohit Harawade",
    role: "Lead Designer",
    image: "/people4.png"
  }
];

const stats = [
  {
    value: "50K+",
    label: "Happy Travelers"
  },
  {
    value: "100+",
    label: "Destinations"
  },
  {
    value: "4.9",
    label: "Average Rating"
  },
  {
    value: "24/7",
    label: "Support"
  }
];