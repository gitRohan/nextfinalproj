'use client'
import { Button } from "@/components/ui/button"
import {useState} from 'react'
const Page=()=>{
    const [inputValue,setInputValue]=useState('')
    const [output,setOutput]=useState<any>()
    const handleChange=(e:any)=>{
        setInputValue(e.target.value)
    }
    async function query(data:any) {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/google/gemma-2-2b-it",
            {
                headers: {
                    Authorization: "",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        const result = await response.json();
        console.log(result)
        setOutput(result)
    }
    
    return (
        <div className="flex flex-col items-center justify-center space-y-10 mt-5">
            <input type='text' value={inputValue} onChange={handleChange} className="w-80 h-8"/>
            <Button onClick={()=>{
                query({"inputs":inputValue})
            }} className="max-w-md">
                Click to respond
            </Button>
            <p className="text-xl px-5 font-semibold">{output?output[0].generated_text:'no response'}</p>
        </div>
    )
}
export default Page;
