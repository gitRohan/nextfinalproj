import { Headings } from "@/components/headings";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Playfair } from "next/font/google";
import {BedIcon, CameraIcon, Check, ForkKnife, ForkKnifeCrossedIcon, HouseIcon, PlaneIcon} from 'lucide-react'
import { ShinnyButton } from "@/components/shinny-button";
import { Navbar } from "@/components/navbar";
import Image from "next/image";
import { TravelFooter } from "@/components/travel-footer";

const font=Playfair({subsets:['latin'],weight:'600'})

export default function Home() {
  return (
    <>
      <Navbar/>
      <section className="relative py-24 sm:py-32 bg-brand-25">
        <MaxWidthWrapper className="text-center">
          <div className="relative mx-auto text-center flex flex-col items-center gap-10">
            <div>
              <Headings className={font.className}>
                <span>Real-Time Trip Insights,</span><br/>
                <span className="relative bg-gradient-to-r from-brand-700 to-brand-800 text-transparent bg-clip-text">Plan Your Tour</span>
              </Headings>
            </div>
            <p className="text-base/7 text-gray-600 max-w-prose text-center text-pretty">
              TourAi is the easiest way to explore your favourite Destinations.
            </p>
            <ul className="space-y-2 text-base/7 text-gray-600 text-left ">
             <li className="flex gap-1.5 items-center text-left">
                <BedIcon className="size-5 text-brand-700"/>
                Stay somewhere great
             </li>
             <li className="flex gap-1.5 items-center text-left">
                <CameraIcon className="size-5 text-brand-700"/>
                Do something fun
             </li>
             <li className="flex gap-1.5 items-center text-left">
                <ForkKnifeCrossedIcon className="size-5 text-brand-700"/>
                Find places to eat
             </li>
             <li className="flex gap-1.5 items-center text-left">
                <PlaneIcon className="size-5 text-brand-700"/>
                Find the best flights
             </li>
             <li className="flex gap-1.5 items-center text-left">
                <HouseIcon className="size-5 text-brand-700"/>
                Explore places to rent
             </li>
            </ul>
            <div className="w-full max-w-80">
              <ShinnyButton href="/sign-up" className="relative z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl">Sign-up For Free Today</ShinnyButton>
            </div>
          </div>

        </MaxWidthWrapper> 
      </section>
      <section className="relative bg-brand-25 pb-4 border-[2px] border-slate-600 shadow-lg">
        <div className="absolute inset-x-0 inset-y-16 bg-brand-700"/>
        <div className="relative flex justify-center items-center">
          <MaxWidthWrapper className="relative flex flex-col md:flex-row items-center justify-around gap-10">
            <div className="relative min-w-sm ">
              <div className="z-10">
                <Image src='/img1.png' width={200} height={350} alt='phone-screen'/>
              </div>
              <Image src='/img2.png' height={320} width={180} alt='phone' className="absolute left-44 top-5 z-0"/>
              <Image src='/img3.png' height={320} width={180} alt='phone' className="absolute -left-36 top-5 z-0"/>
            </div>
            <div className="hidden md:block max-w-md space-y-4">
            <p>Powered by AI</p>
              <Headings>Plan a trip that's so you</Headings>
              <h2>From farm tours to forest bathing-get custom recs for whatever you're into.</h2>
              <div className="w-full max-w-80">
              <ShinnyButton href="/travel" className="relative z-10 h-14 w-full text-base shadow-lg transition-shadow duration-300 hover:shadow-xl">Start a trip with AI</ShinnyButton>
            </div>
            </div>
          </MaxWidthWrapper>
        </div>
      </section>
      <section>
        
      </section>
      <section></section>
      <TravelFooter/>
    </>
  );
}
