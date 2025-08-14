import dbConnect from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";
import User from '@/models/user.model.ts'


export async function GET(request: NextRequest) {
    try {
        await dbConnect()
        const searchParams = request.nextUrl.searchParams;
        console.log("searchParams : " , searchParams )
        const skip: Number | any = searchParams.get('query');
        const limit : Number | any = searchParams.get('limit')
        console.log("skip : " , skip)

        const store = await User.find().skip(skip).limit(limit)
        .select( '-email -comment')


        return NextResponse.json({ message: "data to show on the home page is fetched successfully", store: store }
            , { status: 201 })

    } catch (error) {

        return NextResponse.json({ message: "something went wrong in fetching the data ", error: error }
            , { status: 501 })

    }
}