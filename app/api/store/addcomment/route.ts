import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/database.ts";
import Store from "@/models/store.model.ts";

interface commentType {
    comment: string,
    id: string
}

// creating the new comment
export async function POST(request: NextRequest) {
    try {
        await dbConnect()
        const body = await request.json()
        const { comment, id }: commentType = body

        if (!comment || !id) {
            return NextResponse.json({ message: ' the comment and id is required' }, { status: 401 })
        }

        const user = await Store.findById( id )
        console.log("user : ", user)

        if (!user) {
            return NextResponse.json({ message: 'invalid user' }, { status: 401 })
        }

        const getComment = user.comments
        const perivousCommentSize = getComment.length

        getComment.push(comment)

        const updatedUser = await Store.findByIdAndUpdate(id , { comments: getComment })
        console.log("updatedUser : ", updatedUser)

        const isCommentCreated = await Store.findById(updatedUser?._id)
        console.log('isCommentCreated : ', isCommentCreated)

        const createdComment = isCommentCreated.comments

        if (perivousCommentSize >= createdComment.length) {
            return NextResponse.json({ message: ' something went wrong in creating the comment' }, { status: 501 })
        }

        return NextResponse.json({ message: ' the comment has been has added successfully', comment: createdComment }, { status: 201 })
    } catch (error) {

        return NextResponse.json({ message: 'something went wrong in adding  the new comment ', error: error }, { status: 501 })
    }


}



