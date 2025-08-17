import dbConnect from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model.ts";
import Store from "@/models/store.model";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const searchParams = request.nextUrl.searchParams;

    const skip = parseInt(searchParams.get("skip") || "0", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);

    const store = await Store.aggregate([
      { $match: {} },
      { $skip: skip },
      { $limit: limit },
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "ownerDetails",
        },
      },
      {
        $project: {
          _id: 0,
          rating :1,
          "ownerDetails.userName": 1,
          "ownerDetails.storeName": 1,
          "ownerDetails.address": 1,
          "ownerDetails.description": 1,
          "ownerDetails.avatar": 1,
          "ownerDetails.coverImage": 1,
          "ownerDetails.mobileNumber": 1,
        },
      },
    ]);

    if (!store) {
      return NextResponse.json(
        { message: "Something went wrong in fetching the store data" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Data fetched successfully", store },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong in fetching the data", error },
      { status: 500 }
    );
  }
}
