import Dasboardanalytics from "@/components/dasboardanalytics"
import ProductForm from "@/components/productform"
import UpdateProfile from "@/components/updateprofile"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <div className="min-h-screen w-full flex flex-col items-center px-2">
   <h1 className="font-medium text-3xl">Dashboard</h1>
   <Dasboardanalytics/>
   <ProductForm/>
   <UpdateProfile/>
  </div>
}