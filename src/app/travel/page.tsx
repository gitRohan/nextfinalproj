import { TravelHero } from "./hero";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Headings } from "@/components/headings";
import { Playfair } from "next/font/google";
import { Star } from "lucide-react";
import Link from "next/link"
import Image from "next/image";
import { Icons } from "@/components/icons";
import { TravelFooter } from "@/components/travel-footer";
import { Navbar } from "@/components/navbar";
const font=Playfair({subsets:['latin'],weight:'600'})
export default function Page(){
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
    return(
        <div>
          <Navbar/>
            <TravelHero/>
             <section className="relative py-24 sm:py-32 bg-brand-25">
              <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-20">
               <Headings className={font.className}>Or get starated with popular destination
               </Headings>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {destinations.map((destination,index)=>(
                 <Link key={index} href={`/travel/destinations/${destination.slug}`} className="group relative overflow-hidden rounded-lg">
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
              </MaxWidthWrapper>
             </section>
            <section className="relative py-24 sm:py-32 bg-brand-25">
                <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-20">
                    <div>
                        <h2 className="text-3xl font-bold text-center">
                            Customer Reviews
                        </h2>
                        <Headings className={font.className}>What our customer says</Headings>
                    </div>
                    <div>
                        <Carousel>
                            <CarouselContent className="-ml-4 max-w-sm lg:max-w-2xl">
                                <CarouselItem>
                                  <div className="flex flex-auto flex-col gap-4 bg-brand-25 p-6 sm:p-8 lg:p-16 rounded-b-[2rem] lg:rounded-bl-none lg:rounded-r-[2rem]">
                                  <div className="flex gap-0.5 mb-2 justify-center lg:justify-start">
                                    <Star className="size-5 text-brand-600 fill-brand-600"/>
                                    <Star className="size-5 text-brand-600 fill-brand-600"/>
                                    <Star className="size-5 text-brand-600 fill-brand-600"/>
                                    <Star className="size-5 text-brand-600 fill-brand-600"/>
                                    <Star className="size-5 text-brand-600 fill-brand-600"/>
                                 </div>
                                 <p className="text-base sm:text-lg lg:text-lg/8 font-medium tracking-tight text-brand-950 text-center lg:text-left text-pretty">
                                 TourAI has been paying off for our Tour. Nice to have simple way to see how we're doing day-to-day, Definitely makes our lives easier
                                 </p>
                                 <div className="flex flex-col justify-center lg:justify-start sm:flex-row items-center sm:items-start gap-4 mt-2">
                                 <Image src='/user-2.png' className="rounded-full object-cover" alt='Random user' width={48} height={48}/>
                                 <div className="flex flex-col items-center sm:items-start">
                                   <p className="font-semibold flex items-center">
                                   Pratik Patik
                                   <Icons.verificationBadge className="size-4 inline-block ml-1.5"/>
                                   </p>
                                   <p className="text-sm text-gray-600">@itspratik</p>
                                  </div>
                                 </div>
                                </div>
                                </CarouselItem>
                                <CarouselItem>
                                <div className="flex flex-auto flex-col gap-4 bg-brand-25 p-6 sm:p-8 lg:p-16 rounded-b-[2rem] lg:rounded-bl-none lg:rounded-r-[2rem]">
                                  <div className="flex gap-0.5 mb-2 justify-center lg:justify-start">
                                    <Star className="size-5 text-brand-600 fill-brand-600"/>
                                    <Star className="size-5 text-brand-600 fill-brand-600"/>
                                    <Star className="size-5 text-brand-600 fill-brand-600"/>
                                    <Star className="size-5 text-brand-600 fill-brand-600"/>
                                    <Star className="size-5 text-brand-600 fill-brand-600"/>
                                 </div>
                                 <p className="text-base sm:text-lg lg:text-lg/8 font-medium tracking-tight text-brand-950 text-center lg:text-left text-pretty">
                                 TourAI has been paying off for our Tour. Nice to have simple way to see how we're doing day-to-day, Definitely makes our lives easier
                                 </p>
                                 <div className="flex flex-col justify-center lg:justify-start sm:flex-row items-center sm:items-start gap-4 mt-2">
                                 <Image src='/user-2.png' className="rounded-full object-cover" alt='Random user' width={48} height={48}/>
                                 <div className="flex flex-col items-center sm:items-start">
                                   <p className="font-semibold flex items-center">
                                   Pranav Tawade
                                   <Icons.verificationBadge className="size-4 inline-block ml-1.5"/>
                                   </p>
                                   <p className="text-sm text-gray-600">@itspratik</p>
                                  </div>
                                 </div>
                                </div>
                                </CarouselItem>
                            </CarouselContent>
                            <CarouselPrevious/>
                            <CarouselNext/>
                        </Carousel>

                    </div>
                </MaxWidthWrapper>
            </section>
            <section className="relative pt-24 sm:pt-32 bg-brand-25 pb-0 mb-0">
                <TravelFooter/>
            </section>
        </div>
    )
}