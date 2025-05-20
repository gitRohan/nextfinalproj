'use client'
import { ReactNode } from "react";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { Headings } from "./headings";
import { useRouter } from "next/navigation";

interface DashboardPageProps{
    title:string;
    children?:ReactNode;
    hideBackButton?:boolean;
    cta?:ReactNode;
}
export const DashboardPage=({title,children,hideBackButton,cta}:DashboardPageProps)=>{
    const router=useRouter()
    return (
        <section className="flex-1 w-full h-full flex flex-col">
          <div className="w-full p-6 sm:p-8 flex justify-between border-b border-gray-200">
            <div className="w-full sm:flex-row items-start sm:items-center flex flex-col">
              <div className="flex items-center gap-8">
                {hideBackButton?null:(<Button className="w-fit bg-white" variant='outline' onClick={()=>{router.push('/dashboard')}}>
                  <ArrowLeft className="size-4"/>
                </Button>)}
                
                <Headings>{title}</Headings>
              </div>
                {cta?<div className="ml-8 w-full">{cta}</div>:null}
            </div>
          </div>
          <div className="flex-1 p-6 sm:p-8  flex flex-col overflow-y-auto">
            {children}
          </div>
        </section>
    )
}