'use client'

import { Modal } from "@/components/modal"
import { useState,ReactNode, Children } from "react"
import ReactMarkdown from "react-markdown"
interface CreateItineraryModalProps{
    children:ReactNode
    output:string
}
export const CreateItineraryModal=({children,output}:CreateItineraryModalProps)=>{
    const [isOpen,setIsOpen]=useState(false)
    return(
        <>
            <div onClick={()=>setIsOpen(true)}>{children}</div>
            <Modal showModal={isOpen} setShowModal={setIsOpen} className="w-7xl max-w-[90%]  bg-white overflow-y-auto max-h-[80vh]">
                <div>
                    <h2 className="text-lg/7 font-medium tracking-tight text-gray-950">
                        Generated Itinerary
                    </h2>
                    <p className="text-sm/6 text-gray-600">
                        This is the itinerary generated for your trip
                    </p>
                    <div className="mt-4">
                        <p className="text-sm/6 text-gray-600 markdown-content">
                            <ReactMarkdown>{output}</ReactMarkdown>
                        </p>
                    </div>
                </div>
            </Modal>
        </>
    )
}
