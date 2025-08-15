import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/database.ts";
import Store from "@/models/store.model.ts";

// showing all the comments for the frontend

export async function GET(request: NextRequest) {
    try {
        await dbConnect()
        const body = request.nextUrl.searchParams
        const id = body.get('id')

        if (!id) {
            return NextResponse.json({ message: 'the id is required ' }, { status: 401 })
        }

        const store = await Store.findById(id )

        if (!store) {
            return NextResponse.json({ message: 'invalid Store ' }, { status: 401 })
        }

        return NextResponse.json({ message: " comments fetched successfully ", comments: store.comments }, { status: 201 })
    } catch (error) {

        return NextResponse.json({ message: 'something went wrong in fetching the comments ', error: error }, { status: 501 })
    }


}