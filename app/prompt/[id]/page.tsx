
import { getUser } from "@/actions/user/getUser"
import PromptDetailPage from "./__page"
import { getPromptById } from "@/actions/prompts/getPromptById"
import { getPromptByCategory } from "@/actions/prompts/getPromptByCategory"
import { stripePublishableKey } from "@/actions/payment/paymentAction"

// type Props = {
//     params:{
//         id:string
//     }
// }

const Page = async ({params}:{params:any}) => {
    const data =await getUser()
    const promptData = await getPromptById(params.id)
    const promptDataByCategory = await getPromptByCategory(promptData ? promptData?.category : "")
    const relatedprompt = promptDataByCategory && promptDataByCategory.filter((prompt)=> prompt.id !== promptData?.id)
    const publishableKey = await stripePublishableKey()!;
    



    return (
        <div>
           <PromptDetailPage user={data.user} isSellerExists={data.shop ? true : false}
           promptData={promptData} relatedprompt = {relatedprompt} publishableKey={publishableKey}
           />
        </div>
    )
}

export default Page