import Aboutstore from "@/components/aboutstore"
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <div className="min-h-screen w-full flex flexcol justify-center ">
    <Aboutstore/>

  </div>
}