'use client'
import { ShinnyButton } from '@/components/shinny-button';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function TravelHero() {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  // Function to create query string with `from` and `to` parameters
  const createQueryString = useCallback(
    (from: string, to: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (from) params.set("from", from);
      if (to) params.set("to", to);
      return params.toString();
    },
    [searchParams]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const queryString = createQueryString(fromCity, toCity);
    router.push(`/travel/trip-builder?${queryString}`);
  };

  return (
    <div className="relative h-[600px] w-full">
      <div className="absolute inset-0">
        <Image
          src="/travel-hero.jpg"
          alt="Travel destination"
          fill
          className="object-cover brightness-75"
          priority
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-white">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
          First, where do you want to go?
        </h1>
        <p className="text-xl md:text-2xl text-center mb-8">
          Explore the world's most beautiful destinations. You'll get custom recs you can save and turn into an itinerary.
        </p>

        <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-4">
          <form className="flex flex-col md:flex-row gap-4 w-full" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="From where?"
              className="flex-1 p-3 rounded-md border text-gray-800"
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
            />
            <input
              type="text"
              placeholder="To where?"
              className="flex-1 p-3 rounded-md border text-gray-800"
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
            />
            <button
              type="submit"
              className="shadow-lg hover:shadow-xl transition-shadow duration-300 h-full bg-brand-700 text-white px-6 py-3 rounded-md"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
