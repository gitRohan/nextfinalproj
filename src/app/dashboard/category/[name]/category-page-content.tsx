'use client'
import { Event, EventCategory } from "@prisma/client"
import {QueryClient, QueryClientProvider, useQuery} from '@tanstack/react-query'
import { EmptyCategoryState } from "./empty-category-state"
import { useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { tokenid } from "@/app/actions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { ArrowUpDown, BarChart } from "lucide-react"
import { isAfter, isToday, startOfMonth, startOfWeek } from "date-fns"
import {Column, ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, Row, SortingState, useReactTable} from '@tanstack/react-table'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { JsonValue } from "@prisma/client/runtime/library"
import { Headings } from "@/components/headings"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"
import Markdown from "react-markdown"
import remarkGfm from 'remark-gfm'

interface CategoryPageContentProps{
    hasEvents:boolean
    category:EventCategory
}

export const CategoryPageContent=({hasEvents:initialHasEvents,category}:CategoryPageContentProps)=>{

    const [queryClient] = useState(() => new QueryClient())
    const {data:pollingData}=useQuery({
        queryKey:['category',category.name,'hasEvents'],
        initialData:{hasEvents:initialHasEvents}
    })

    const searchParams=useSearchParams()

    const page=parseInt(searchParams.get("page")||"1",10)
    const limit=parseInt(searchParams.get("limit")||"30",10)

    const [pagination, setPagination]=useState({pageIndex:page-1,pageSize:limit})

    const [activeTab,setActiveTab]=useState<"today"|"week"|"month">("today")
    if(!pollingData.hasEvents){
        return( 
        <div>
            <QueryClientProvider client={queryClient}>
            <EmptyCategoryState categoryName={category.name} hasEvents={initialHasEvents}/>
            </QueryClientProvider>
        </div>
        )
    }
    
    const [eventsdata,setEventsData]=useState<{events: {
        name: string;
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        formattedMessage: string;
        fields: JsonValue;
        deliveryStatus:'DELIVERED'|'PENDING'|'FAILED';
        eventCategoryId: string | null;
    }[],eventsCount:number,uniqueFieldCount:number}>()
    const {data,isFetching}=useQuery({
        queryKey:["events",category.name,pagination.pageIndex,pagination.pageSize,activeTab],
        queryFn:async()=>{
            const tk=await tokenid()
            const res = await fetch('http://localhost:3000/api/category-event',{method:'POST',body:JSON.stringify(inputData),headers:{'Authorization':'Bearer '+tk}})
            const responseData=await res.json();
            setEventsData(responseData)
            return responseData;
            
        },
        refetchOnWindowFocus:false,
        enabled:pollingData.hasEvents
    })
    const columns:ColumnDef<Event>[]=useMemo(()=>[
        {
            accessorKey:"category",
            header:"Category",
            cell:()=><span>{category.name || "Uncategorized"}</span>,
        },
        {
            accessorKey:"createdAt",
            header:({column}:{column:Column<Event>})=>{
                return(
                    <Button variant="ghost" onClick={()=>{
                        column.toggleSorting(column.getIsSorted()==="asc")
                    }}>
                      Date
                      <ArrowUpDown className="ml-2 size-4"/>
                    </Button>
                )
            },
            cell:({row}:{row:Row<Event>})=>{
                return new Date(row.getValue("createdAt")).toLocaleString()
            }
        },
        ...(eventsdata?.events[0]?Object.keys(eventsdata.events[0].fields as object).map((field)=>({
            accessorFn:(row:Event)=>(
                row.fields as Record<string,any>
            )[field],
            header:field,
            cell:({row}:{row:Row<Event>})=>(
                (row.original.fields as Record<string,any>)[field]||"_"
            )
        })):[]),
        {
            accessorKey:"deliveryStatus",
            header:"Delivery Status",
            cell:({row})=>(
                <span className={cn("px-2 py-1 rounded-full text-xs font-semibold",{
                    "bg-green-100 text-green-800":row.getValue("deliveryStatus")==="DELIVERED",
                    "bg-red-100 text-red-800":row.getValue("deliveryStatus")==="FAILED",
                    "bg-yellow-100 text-yellow-800":row.getValue("deliveryStatus")==="PENDING"
                })}>
                    {row.getValue("deliveryStatus")}
                </span>
            )
        }
    ],[category.name,eventsdata?.events])

    const [sorting,setSorting]=useState<SortingState>([])
    const [columnFilters,setColumnFilters]=useState<ColumnFiltersState>([])
    const table=useReactTable({
        data:eventsdata?.events||[],
        columns,
        getCoreRowModel:getCoreRowModel(),
        onSortingChange:setSorting,
        getSortedRowModel:getSortedRowModel(),
        onColumnFiltersChange:setColumnFilters,
        getFilteredRowModel:getFilteredRowModel(),
        getPaginationRowModel:getPaginationRowModel(),
        manualPagination:true,
        pageCount:Math.ceil((eventsdata?.eventsCount||0)/pagination.pageSize),
        onPaginationChange:setPagination,
        state:{
            sorting,
            columnFilters,
            pagination,
        }
    })

    const inputData={
        name:category.name,
        page:pagination.pageIndex+1,
        limit:pagination.pageSize,
        timeRange:activeTab
    }

    const numericFieldSum=useMemo(()=>{
        if(!eventsdata?.events||eventsdata.events.length===0){
            return {}
        }
        const sum:Record<string,{
            total:number
            thisWeek:number
            thisMonth:number
            today:number
        }>={}

        const now= new Date()
        const weekStart=startOfWeek(now,{weekStartsOn:0})
        const monthStart=startOfMonth(now)

        eventsdata.events.forEach((event)=>{
            const eventDate=event.createdAt

            Object.entries(event.fields as object).forEach(([field,value])=>{
                if(typeof value==="number"){
                    if(!sum[field]){
                        sum[field]={total:0,thisWeek:0,thisMonth:0,today:0}
                    }
                    sum[field].total+=value
                    if(isAfter(eventDate,monthStart)||eventDate.getTime()===weekStart.getTime()){
                        sum[field].thisWeek+=value
                    }

                    if(isAfter(eventDate,monthStart)||eventDate.getTime()===monthStart.getTime()){
                        sum[field].thisMonth+=value
                    }

                    if(isToday(eventDate)){
                        sum[field].today+=value
                    }
                }
            })
        })
        return sum
    },[eventsdata?.events])

    const NumericFieldSumCards=()=>{
        if(Object.keys(numericFieldSum).length===0) return null

        return Object.entries(numericFieldSum).map(([field,sums])=>{
            const relevantSum=activeTab==='today'?sums.today:activeTab==='week'?sums.thisWeek:sums.thisMonth

            return(
                <Card key={field}>
                    <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <p className="text-sm/6 font-medium">{field.charAt(0).toUpperCase()+field.slice(1)}</p>
                        <BarChart className="size-4 text-muted-foreground"/>
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{relevantSum.toFixed(2)}</p>
                            <p className="text-xs/5 text-muted-foreground"> Events {activeTab==='today'?'today':activeTab==='week'?'this week':'this month'}</p>
                        </div>
                </Card>
            )
        })
    }

    return(
        <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={(value)=>{setActiveTab(value as "today"|"week"|"month")}}>
                <TabsList className="mb-2">
                    <TabsTrigger value="today">Today</TabsTrigger>
                    <TabsTrigger value="week">This Week</TabsTrigger>
                    <TabsTrigger value="month">This Month</TabsTrigger>
                </TabsList>
                <TabsContent value={activeTab}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                      <Card className="border-2 border-brand-700">
                        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <p className="text-sm/6 font-medium">Total Events</p>
                          <BarChart className="size-4 text-muted-foreground"/>
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{eventsdata?.eventsCount}</p>
                            <p className="text-xs/5 text-muted-foreground"> Events {activeTab==='today'?'today':activeTab==='week'?'this week':'this month'}</p>
                        </div>
                      </Card>
                      <NumericFieldSumCards/>
                    </div>
                </TabsContent>
            </Tabs>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="w-full flex flex-col gap-4">
                  <Headings className="text-3xl">Event Overview</Headings>
                </div>
              </div>
              <Card contentClassName="px-6 py-4">
                <Card className="w-2/3 h-full flex flex-col justify-between p-4 bg-brand-50 border border-slate-200 shadow-sm rounded-lg hover:scale-105" >
                                  <div className="flex items-center gap-4 mb-4">
                                    <Image
                                      src="https://r-xx.bstatic.com/data/airlines_logo/6E.png"
                                      alt="Airline Logo"
                                      width={20}
                                      height={20}
                                      className="rounded-full"
                                    />
                                    <div>
                                      <h3 className="text-lg font-semibold"></h3>
                                      <p className="text-sm text-gray-500">Chhatrapati Shivaji International Airport Mumbai - Chennai International Airport</p>
                                    </div>
                                  </div>
                                  <div className="text-lg font-bold text-gray-800">
                                    Price: 11622 INR
                                  </div>
                                </Card>
              </Card>
              <Card contentClassName="px-6 py-4">
              <Card className="w-2/3 h-full flex flex-col justify-between p-4 bg-brand-50 border border-slate-200 shadow-sm rounded-lg hover:scale-105" >
                                  <div className="flex items-center gap-4 mb-4">
                                    <Image
                                      src="https://cf.bstatic.com/xdata/images/hotel/square500/545170671.jpg?k=f03c25ad291ee5c143fef42cc5dd85aad530b4aca75d29ff8b9ebf982d56ae30&o="
                                      alt="Airline Logo"
                                      width={40}
                                      height={40}
                                      className="rounded-full"
                                    />
                                    <div>
                                      <h3 className="text-lg font-semibold"></h3>
                                      <p className="text-sm text-gray-500">Park Hyatt Chennai</p>
                                    </div>
                                  </div>
                                  <div className="text-lg font-bold text-gray-800">
                                    Price: 26900 INR
                                  </div>
                                </Card>
              </Card>
              <h2>Total- 38522</h2>
              <Card contentClassName="px-6 py-4">
                <Markdown remarkPlugins={[remarkGfm]}>Chennai Family Trip: 23rd - 25th (Including Hidden Gems)
This itinerary balances popular attractions with some lesser-known gems, suitable for a family trip. Adjust timings based on your family's preferences and ages.

Day 1 (23rd): Arrival & South Chennai Exploration

Morning (Arrival & Check-in): Arrive at Chennai Airport (MAA), transfer to your pre-booked hotel. Consider staying near Mylapore for easy access to many attractions.
Afternoon (Mylapore Exploration): Explore Mylapore's vibrant streets.
Kapaleeshwarar Temple: A stunning Dravidian-style temple with intricate carvings. Engage with the temple's atmosphere and learn about its history.
San Thome Basilica: A significant Catholic church with a beautiful architecture.
Hidden Gem: Mylapore Fine Arts Society: If your family appreciates art, visit this gallery showcasing South Indian art.
Hidden Gem: Luz Church: A historic church with a charming atmosphere, different from the grandeur of San Thome.
Evening (Dinner & Marina Beach): Enjoy a delicious South Indian dinner at a local restaurant in Mylapore. Take a relaxing stroll along Marina Beach, experiencing the Chennai sunset.
Day 2 (24th): Fort St. George & North Chennai Culture

Morning (Fort St. George): Visit Fort St. George, the oldest British fort in India. Explore the museum and the Legislative Assembly building (exterior view only).
Afternoon (North Chennai Culture):
Government Museum: A treasure trove of art, sculptures, and archaeology. Focus on sections appealing to your family's interests.
Hidden Gem: Parthasarathy Temple: A beautiful ancient temple dedicated to Lord Krishna, located within Triplicane. Often less crowded than Kapaleeshwarar.
Hidden Gem: Semmozhi Poonga: A botanical garden with beautifully landscaped areas, perfect for a relaxing walk. This is an excellent option if you have children.
Evening (Shopping & Dinner): Explore the vibrant George Town area for some shopping (textiles, spices, etc.). Enjoy dinner at a restaurant in George Town, experiencing a different side of Chennai's culinary scene.
Day 3 (25th): Relaxation & Departure

Morning (Relaxation & Last-minute Souvenirs): Enjoy a leisurely breakfast. Depending on your flight time, you can do some last-minute souvenir shopping at a local market or relax at your hotel.
Hidden Gem (if time permits): Visit the Dakshinachitra museum, an open-air museum showcasing South Indian village life. This is a wonderful cultural experience.
Afternoon (Departure): Transfer to Chennai Airport for your departure.
Hidden Gems Explained:

Mylapore Fine Arts Society: Offers a quieter, more intimate art experience than larger museums.
Luz Church: Provides a contrast to the larger San Thome Basilica, offering a sense of local history and community.
Parthasarathy Temple: A less crowded but equally significant temple, allowing for a more peaceful visit.
Semmozhi Poonga: A serene escape, perfect for families with children, providing a break from the busy city.
Dakshinachitra (if time permits): Provides a unique cultural immersion into traditional South Indian village life.
Tips for a Smooth Trip:

Pre-book your accommodation and flights.
Consider using ride-hailing apps or taxis for transportation. Public transport is available but can be crowded.
Carry comfortable shoes, as you'll be doing a lot of walking.
Stay hydrated, especially during the hotter months.
Be mindful of local customs and traditions when visiting temples. Dress modestly (covering shoulders and knees).
Learn a few basic Tamil phrases – it will enhance your experience.
This itinerary offers a blend of popular and hidden gems, ensuring a memorable family trip to Chennai. Remember to adapt it based on your family's preferences and interests. Enjoy your trip!</Markdown>
              </Card>
              <Card contentClassName="px-6 py-4">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup)=>(
                            <TableRow key={headerGroup.id}>
                              {headerGroup.headers.map((header)=>(
                                <TableHead key={header.id}>
                                  {header.isPlaceholder?null:flexRender(header.column.columnDef.header,
                                    header.getContext()
                                  )}
                                </TableHead>
                              ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isFetching?[...Array(5)].map((_,rowIndex)=>(
                            <TableRow key={rowIndex}>
                                {columns.map((_,cellIndex)=>(
                                    <TableCell key={cellIndex}>
                                      <div className="h-4 w-full bg-gray-200 animate-pulse rounded"/>
                                    </TableCell>
                                ))}
                            </TableRow>
                        )):table.getRowModel().rows.length?table.getRowModel().rows.map((row)=>(
                            <TableRow key={row.id}>
                              {row.getVisibleCells().map((cell)=>(
                                <TableCell key={cell.id}>
                                  {flexRender(cell.column.columnDef.cell,cell.getContext())}
                                </TableCell>
                              ))}
                            </TableRow>
                        )):<TableRow>
                          <TableCell colSpan={columns.length} className="h-24 text-center">
                            No Result
                          </TableCell>
                        </TableRow>}
                    </TableBody>
                </Table>
              </Card>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
              <Button variant='outline' size='sm' onClick={()=>table.previousPage()} disabled={!table.getCanPreviousPage()||isFetching}>Previous</Button>
              <Button variant='outline' size='sm' onClick={()=>table.nextPage()} disabled={!table.getCanNextPage()||isFetching}>Previous</Button>
            </div>
        </div>
    )
}
