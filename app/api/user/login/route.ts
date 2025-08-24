import dbConnect from "@/lib/database.ts";
import User from "@/models/user.model.ts"
import { NextRequest, NextResponse } from "next/server";

interface emailType {
    email: string
}

export async function POST(request: NextRequest) {

    try {
        await dbConnect()

        // descturting the email
        const body = await request.json()

        const { email } = body


        //checkin if the email exits or not
        if (!email) {
            return NextResponse.json({ message: "email is required" }
                , { status: 401 }
            )
        }

        // checking if email already exits or not 
        // const isExisted = await User.findOne({ email: email })


        // if (isExisted) {
        //     return NextResponse.json({ message: "user already exits" }, { status: 401 })
        // }


        // add the user with email
        const user = await User.create({
            email: email,

        })

        // lets check if the user is created or not 
        const isDone = await User.findById(user?._id)

        if (!isDone) {
            return NextResponse.json({ message: "something went wrong at the time if login " }, { status: 501 })
        }

        return NextResponse.json(
            {
                message: "login done !!!",
                user: user
            }
            , { status: 201 })


    } catch (error) {

        return NextResponse.json({
            message: "something went wrong at the time of login",
            error : error
        },
            { status: 501 }
        )

    }

}

