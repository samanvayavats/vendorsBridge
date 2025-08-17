import dbConnect from "@/lib/database";
import { NextRequest } from "next/server";

export async function GET(request : NextRequest){
     await dbConnect()
     


}