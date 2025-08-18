import cloudinary from "@/lib/cloudinary";
import dbConnect from "@/lib/database";
import deleteFromCloudinary from "@/lib/deletefromcloudinary";
import Store from "@/models/store.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

// Update store details
export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const form = await request.formData();
        if (!form) {
            return NextResponse.json(
                { message: "At least one field is required" },
                { status: 401 }
            );
        }

        const email = form.get("email") as string;
        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }

        // Find user & store
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const store = await Store.findOne({ owner: user._id });
        if (!store) {
            return NextResponse.json({ message: "Store not found" }, { status: 404 });
        }

        // Fields
        const storeName = form.get("storeName") as string;
        const address = form.get("address") as string;
        const description = form.get("description") as string;
        const mobileNumber = parseInt(form.get("mobileNumber") as string);

        const avatar = form.get("avatar") as File | null;
        const coverImage = form.get("coverImage") as File | null;

        // Update text fields if provided
        if (storeName) {
            user.storeName = storeName;
            store.storeName = storeName
        }

        if (address) user.address = address;

        if (description) user.description = description;

        if (mobileNumber) {
            user.mobileNumber = mobileNumber;
            store.mobileNumber = mobileNumber;
        }

        // saving the new mobileNumber and storename
        await store.save()

        // Handle avatar upload
        if (avatar) {
            if (user.avatar) {
                const oldAvatar = user.avatar

                const startingAvatarIndex = oldAvatar.lastIndexOf('/')
                const endingAvatarIndex = oldAvatar.lastIndexOf('.')

                const avatarPublicId = oldAvatar.substring(startingAvatarIndex + 1, endingAvatarIndex)

                await deleteFromCloudinary(avatarPublicId, "image");
            }

            const arrayBuffer = await avatar.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const uploadRes = await new Promise<any>((resolve, reject) => {
                cloudinary.uploader
                    .upload_stream({ folder: "store/avatar" }, (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    })
                    .end(buffer);
            });

            user.avatar = uploadRes.url
        }

        // Handle coverImage upload
        if (coverImage) {
            if (user.coverImage) {
                const oldCoverImage = user.coverImage

                const startingCoverImageIndex = oldCoverImage.lastIndexOf('/')
                const endingCoverImageIndex = oldCoverImage.lastIndexOf('.')

                const coberImagePublicId = oldCoverImage.substring(startingCoverImageIndex + 1, endingCoverImageIndex)

                await deleteFromCloudinary(coberImagePublicId, "image");
            }

            const arrayBuffer = await coverImage.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const uploadRes = await new Promise<any>((resolve, reject) => {
                cloudinary.uploader
                    .upload_stream({ folder: "store/coverImage" }, (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    })
                    .end(buffer);
            });

            user.coverImage = uploadRes.url
        }

        await user.save();

        return NextResponse.json(
            { message: "Store updated successfully", user },
            { status: 200 }
        );
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ message: "Server error", error: error.message }, { status: 500 });
    }
}
