import { NextRequest, NextResponse } from "next/server";
import Product from '@/models/product.model'
import dbConnect from "@/lib/database";
import mongoose from "mongoose";

export async function GET(request: NextRequest) {

    try {

        await dbConnect()

        const body = request.nextUrl.searchParams
        console.log("body : " , body)

        const storeId = body.get("storeId") as string
        const skip = parseInt(body.get("skip") || "0", 10);
        const limit = parseInt(body.get("limit") || "10", 10);
  
        console.log(storeId , skip , limit)


        // if (!storeId || !skip || !limit) {
        //     return NextResponse.json({ message: "all the fields are  required " }, { status: 401 })
        // }

        const product = await Product.aggregate([
            { $match: { store: new mongoose.Types.ObjectId(storeId) } },
            { $skip: skip },
            { $limit: limit },
            {
                $project: {
                    productDescription: 1,
                    productImage: 1,
                    price: 1
                }
            }
        ])

        if (!product) {
            return NextResponse.json({ message: "something went wrong in fetching the products " }, { status: 501 })
        }

        return NextResponse.json({ message: "all the products fetched successfully ", product: product }, { status: 200 })

    } catch (error) {

        return NextResponse.json({ message: "something went wrong in fetching the products ", error: error }, { status: 501 })


    }

}