import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary.ts"
import dbConnect from "@/lib/database.ts";
import User from "@/models/user.model.ts"
import Store from "@/models/store.model.ts"

export async function POST(request: NextRequest) {
    try {
        await dbConnect()

        const form = await request.formData()

        const email = form.get('email') as string
        const userName = form.get('userName') as string
        const storeName = form.get('storeName') as string
        const address = form.get('address') as string
        const description = form.get('description') as string
        const mobileNumber = form.get('mobileNumber') as string

        const avatar = form.get('avatar') as File
        const coverImage = form.get('coverImage') as File


        if (!email ||!userName || !storeName || !address || !description || !mobileNumber) {
            return NextResponse.json({
                message: "all the fields is required"},
                {status: 401}
            )
        }

        if (!avatar || !coverImage) {
            return NextResponse.json({
                message: "avatar and coverImage is required"},
                {status: 401}
            )
        }
        
        let avatarFile: string | any = ''
        let coverImageFile: string | any = ''

        try {
            if (avatar) {
            const avatarByte = await avatar.arrayBuffer()
            const avatarBuffer = Buffer.from(avatarByte)
            avatarFile = await new Promise((resolve, reject) => {
                cloudinary.uploader
                    .upload_stream((error, result: string | any) => {
                        if (error) reject(error);
                        else resolve(result);
                    })
                    .end(avatarBuffer);
            });
        }


        if (coverImage) {
            const coverImageByte = await coverImage.arrayBuffer()
            const coverImageBuffer = Buffer.from(coverImageByte)
            coverImageFile = await new Promise((resolve, reject) => {
                cloudinary.uploader
                    .upload_stream((error, result: string | any) => {
                        if (error) reject(error);
                        else resolve(result);
                    })
                    .end(coverImageBuffer);
            });
         }
         
        } catch (error) {
            return NextResponse.json({
                message :" cannot upload the avatar and coverImage"
            }
          ,{status : 501})
        }

         if (!avatarFile || !coverImageFile) {
                return NextResponse.json(
                    { message: "facing some problem to upload the  avatar and coverImage on cloudinary"},
                   { status: 501}
                )}

             
            const user = await User.findOneAndUpdate({email : email},{
                userName: userName,
                storeName: storeName,
                address: address,
                description: description,
                mobileNumber: mobileNumber,
                avatar: avatarFile.url || '',
                coverImage: coverImageFile.url || '',
                rating : 0
            },{new : true})

            const store = await Store.create({
                userName: userName,
                storeName: storeName,
                owner : user?._id,
                mobileNumber: mobileNumber,
                storeViews:0,
                rating :0
            }) 
            
            const createdStore = await Store.findById(store?._id)
            if (!createdStore) {
                return NextResponse.json(
                    {message: "store creation failes"},
                    {status: 401}
            )}



            const foundUser = await User.findById(user?._id);

            if (!foundUser) {
                return NextResponse.json(
                    {message: "registeration failes to backend"},
                    {status: 401}
            )}

            return NextResponse.json({
                message: "registeration success",
                user: foundUser
            },

                { status: 201 })

    } catch (error) {

        return NextResponse.json({
            message: "something went wrong at the time of registeration"
        },
            { status: 501 }
        )
    }
}