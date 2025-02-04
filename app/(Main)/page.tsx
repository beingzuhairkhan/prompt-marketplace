'use server'
import { getAllPrompts } from "@/actions/prompts/getAllPrompts";
import RoutePage from "./__page";
import { getUser } from "@/actions/user/getUser";
import { getPromptByCategory } from "@/actions/prompts/getPromptByCategory";


const Page = async ()=>{

    const data = await getUser()
    // console.log("data" , data)
    const promptsData = await getAllPrompts()
   
  return(
    <div>
      <RoutePage user={data?.user} isSellerExists={data?.shop ? true : false} activeItem={0}
      promptsData={promptsData?.prompts}
      />
    </div>
  )
}

export default Page ;