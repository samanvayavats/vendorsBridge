import dbConnect from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";
import Store from "@/models/store.model"

export async function PATCH(request: NextRequest) {

    try {
        await dbConnect()

        const body = request.nextUrl.searchParams

        const storeId = body.get('storeId') as string
        const rating = parseInt(body.get('rating') || "0", 0)
        
        const storeRating = await Store.findById(storeId)


        if (rating && storeRating.rating.length == 0) {
            let ratingArr = []
            ratingArr.push(rating)
            ratingArr.push(1)
            const store = await Store.findByIdAndUpdate(storeId, { rating: ratingArr })
            let newRating = (store.rating[0]/store.rating[1])

            if (!store) {
                return NextResponse.json({ message: "something went wrong in updating the rating" }, { status: 501 })
            }

            return NextResponse.json({ message: "this is the first rating ", rating: newRating }, { status: 201 })
        }

        if (rating && storeRating.rating.length > 0) {
            let ratingArr = []
            let tempRating = storeRating.rating[0]
            let tempRatedBy = storeRating.rating[1]
            tempRating += rating
            tempRatedBy += 1
            ratingArr.push(tempRating)
            ratingArr.push(tempRatedBy)

            const store = await Store.findByIdAndUpdate(storeId, { rating: ratingArr })

            if (!store) {
                return NextResponse.json({ message: "something went wrong in updating the rating" }, { status: 501 })
            }

            let newRating = (store.rating[0] / store.rating[1])

            return NextResponse.json({ message: "this the new rating ", rating: newRating }, { status: 201 })

        }

        const store = await Store.findById(storeId)

        if (!store) {
            return NextResponse.json({ message: "Invalid user or store" }, { status: 401 })
        }

        let newRating = (store.rating[0]/store.rating[1])

        return NextResponse.json({ message: "the rating has been fetched successfully ", rating: newRating }
            , { status: 200 }
        )

    } catch (error) {

        return NextResponse.json({ message: "something went wrong in updating the rating or fetching the rating ", error: error }
            , { status: 501 })

    }
}