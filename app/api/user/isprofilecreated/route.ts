import dbConnect from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";

export async function GET(request: NextRequest) {
    try {
        await dbConnect()
        const body = request.nextUrl.searchParams
        const email = body.get('email') as string

        if (!email) {
            return NextResponse.json({ message: " email is required " }, { status: 401 })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({ message: " Invalid User " }, { status: 401 })
        }

        if (!user.storeName) {
            return NextResponse.json({ message: " the user has not registered yet for the store  ", isRegistered: false }, { status: 401 })
        }

        return NextResponse.json({ message: " user has registered for the store  ", isRegistered: true }, { status: 200 })
    } catch (error) {
      return NextResponse.json({ message: " something went wrong internal server problem   " }, { status: 501 })
    }
}