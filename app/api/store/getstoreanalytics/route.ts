import dbConnect from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";
import Store from "@/models/store.model"

export async function GET(request: NextRequest) {
    try {

        await dbConnect()
        const body = request.nextUrl.searchParams
        const view: string | null = body.get("view")
        const storeId: string | null = body.get('storeId')

        const store = await Store.findById(storeId)

        if (!store) {
            return NextResponse.json({ message: "invalid store or user" }, { status: 401 })
        }

        let tempViews: number = 0

        if (view == '1') {

            tempViews = store.storeViews
            tempViews += 1

            const viewUpdated = await Store.findByIdAndUpdate(store?._id, { storeViews: tempViews })

        }

        const isUpdated = await Store.findById(store?._id)

        if (isUpdated.storeViews != tempViews && tempViews != 0) {
            return NextResponse.json({ message: "something went wrong in updating the view" }, { status: 501 })
        }

        return NextResponse.json({ message: "the view has been fetched successfully ", view: isUpdated.storeViews }, { status: 200 })

    } catch (error) {

        return NextResponse.json({ message: "something went wrong in updating the view", error: error }, { status: 501 })

    }





}