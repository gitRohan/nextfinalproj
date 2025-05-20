import { db } from "@/lib/db";
import { headers } from "next/headers";
import {startOfMonth} from 'date-fns'
import { NextResponse } from "next/server";
import superjson from 'superjson';

export async function GET(){
    const auth=(await headers()).get('authorization')
    const apiKey=auth?.split(' ')[1]
    const User=await db.user.findUnique({
        where:{apiKey},
    })
    const categories=await db.eventCategory.findMany({
        where:{userId:User?.id},
        select:{
            id:true,
            name:true,
            emoji:true,
            color:true,
            updatedAt:true,
            createdAt:true
        },
        orderBy:{updatedAt:'desc'}
    })
    const categoriesWithCounts = await Promise.all(
        categories.map(async (category) => {
          const now = new Date();
          const firstDayofMonth = startOfMonth(now);
      
          const [uniqueFieldCount, eventsCount, lastPing] = await Promise.all([
            db.event
              .findMany({
                where: {
                  EventCategory: { id: category.id },
                  createdAt: { gte: firstDayofMonth },
                },
                select: { fields: true },
                distinct: ["fields"],
              })
              .then((events) => {
                const fieldNames = new Set<string>();
                events.forEach((event) => {
                  Object.keys(event.fields as object).forEach((fieldName) => {
                    fieldNames.add(fieldName);
                  });
                });
      
                return fieldNames.size;
              }),
            db.event.count({
              where: {
                EventCategory: { id: category.id },
                createdAt: { gte: firstDayofMonth },
              },
            }),
            db.event.findFirst({
              where: {
                EventCategory: { id: category.id },
              },
              orderBy: { createdAt: "desc" },
              select: { createdAt: true },
            }),
          ]);
          const lastPingsuperjson=superjson.stringify(lastPing)
          return { ...category, uniqueFieldCount, eventsCount, lastPingsuperjson };
        })
      );

      return NextResponse.json(categoriesWithCounts);
}