import { Clock } from "lucide-react"
import Image from "next/image"

interface DiscordMessageProps{
    avatarSrc:string
    avatarAlt:string
    username:string
    timestamp:string
    badgeText?:string
    badgeColor?:string
    title:string
    content:{
        [key:string]:string
    }
}
export const DiscordMessage=({avatarAlt,avatarSrc,content,timestamp,title,username,badgeColor='#43b581',badgeText}:DiscordMessageProps)=>{
    return(
        <div className="w-full flex items-start justify-start">
            <div className="flex items-start mb-2">
                <Image src={avatarSrc} alt={avatarAlt} width={40} height={40} className="object-cover rounded-full mr-3"/>
            </div>
            <div className="w-full max-w-xl">
                <div className="flex items-center">
                    <p className="font-semibold text-white">{username}</p>
                    <span className="ml-2 px-1.5 pt-1 text-xs font-semibold bg-brand-600 text-white rounded">APP</span>
                    <span className="pt-1 text-gray-400 ml-1.5 text-xs font-normal">{timestamp}</span>
                </div>
                <div className=" flex items-center bg-[#2f3136] text-sm w-full rounded p-3 mb-0 mt-1.5">
                    <p className="text-white order-1 text-base/7 font-semibold">{title}</p>
                    <span className="ml-auto flex order-2 items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset text-[#faa61a]">{badgeText}</span>
                    
                </div>
                <div className="bg-[#2f3136] mt-0 pt-2 pl-3 space-y-2 mb-0">
                {Object.entries(content).map(([key,value])=>(
                    <p key={key} className="text-[#dcddde] text-sm/6">
                      <span className="text-[#b9bbbe]">{key}:{" "}</span>{value}
                    </p>
                ))}
                </div>
                <div className="bg-[#2f3136] mt-0 pt-3 pl-3 h-10 rounded-b">
                    <p className="text-[#72767d] text-xs flex items-center">
                      <Clock className="size-3 mr-1"/>
                      {timestamp}
                    </p>
                </div>
            </div>
        </div>
    )
}