import { getUser } from "@/actions/user/getUser"
import MarketPlaceRouter from "./_page"
import { getAllPrompts } from "@/actions/prompts/getAllPrompts"


const Page = async ({searchParams}:{searchParams:{[key:string]:string | undefined}})=>{
    const page = searchParams["page"] ?? "1"
    const pageNumber = parseInt(page);
    const data = await getUser()
    const promptsData = await getAllPrompts(pageNumber)
    return(
        <div>
            <MarketPlaceRouter user={data?.user} isSellerExists={data?.shop ? true : false} promptsData={promptsData?.prompts}
            totalPrompts={promptsData?.totalPrompts}
            />
        </div>
    )
}

export default Page