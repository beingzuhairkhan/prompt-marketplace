import SellerBanner from "@/components/Shop/SellerBanner"
import { styles } from "@/utils/styles"
import PromptDetailsCard from './PromptDetailsCard'
import PromptInformation from  './PromptInformation'
import PromptCard from "../PromptCard"
import PromptCardLoader from "@/utils/PromptCardLoader";
import { useEffect, useState } from "react";
type props = {
    promptData:any;
    relatedprompt:any;
    stripePromise:any;
    clientSecret:string 
}
const PromptDetails = ({promptData , relatedprompt , stripePromise , clientSecret}:props) => {
    const [prompts, setPrompts] = useState();
    const [loading, setLoading] = useState(true);
    const fetchPromptData = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `/api/get-related-prompts?promptCategory=${promptData?.category}`
          );
          const data = await response.json();
          console.log("data",  data);
          setPrompts(data);
        } catch (error) {
          console.error("Failed to fetch prompts:", error);
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        fetchPromptData();
      }, []);
    return (
        <div>
            <PromptDetailsCard promptData={promptData} stripePromise={stripePromise} clientSecret={clientSecret}  />
            <br />
            <br />
            {/* prompt information */}
            <PromptInformation promptData={promptData} />
            <br />
            <h1 className={`${styles.heading} px-2 pb-2 `} >
                Related Prompt
            </h1>
            <div className="flex flex-wrap">
        {loading ? (
          [...new Array(4)].map((i) => (
            <>
              <PromptCardLoader />
            </>
          ))
        ) : (
          <>
            {prompts &&
              prompts.map((item: any) => (
                <PromptCard prompt={item} key={item.id} />
              ))}
          </>
        )}
      </div>
      {prompts?.length === 0 && (
        <p className={`${styles.label} text-center block my-5`}>
          No prompt found with this category!
        </p>
      )}
            <br/>
            <br/>
            <SellerBanner/>
            <br/>
        </div>
    )
}

export default PromptDetails