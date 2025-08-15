import dbConnect from "@/lib/database.ts";
import cloudinary from "@/lib/cloudinary.ts"
import Product from "@/models/product.model.ts"
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        
        await dbConnect()
        const body = await request.formData()

        const owner = body.get("owner") as string
        const store = body.get("store") as string
        const productDescription = body.get("productDescription") as string
        const productImage = body.get("productImage") as File
        const  price = parseInt(body.get("price") as string)

        if (!owner || !store || !productDescription || !price) {
            return NextResponse.json({
                message: "all the fields is required"
            },
                { status: 401 }
            )
        }

        if (!productImage) {
            return NextResponse.json({
                message: "the product image is required"
            },
                { status: 401 }
            )
        }

        let productImageFile: string | any = ''

        if (productImage) {
            const productImageByte = await productImage.arrayBuffer()
            const productImageBuffer = Buffer.from(productImageByte)
            productImageFile = await new Promise((resolve, reject) => {
                cloudinary.uploader
                    .upload_stream((error, result: string | any) => {
                        if (error) reject(error);
                        else resolve(result);
                    })
                    .end(productImageBuffer);
            });
        }

        if (!productImage) {
            return NextResponse.json(
                { message: "facing some problem to upload the productImage on cloudinary" },
                { status: 501 }
            )
        }

        const product = await Product.create({
            owner : owner ,
            store : store,
            productDescription : productDescription,
            productImage : productImageFile.url || '',
            price : price
        })

        const isProductListed = await Product.findById(product?._id).select('-owner -store')

        if(!isProductListed){
             return NextResponse.json(
                { message: "facing some problem to upload the list the product" },
                { status: 501 }
            )
        }

        return NextResponse.json({ message: "the product has been list successfully " , product : isProductListed }
            ,{status : 201 })
       

    } catch (error) {

        return NextResponse.json({
            message: "something in listing the product",
            error : error
        },
            { status: 501 })
    }

}