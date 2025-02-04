'use client'
import { getShopById } from "@/actions/shop/getShopById"
import { styles } from "@/utils/styles"
import { Avatar, Divider, Tab, Tabs } from "@nextui-org/react"
import { useEffect, useState } from "react"
import ReviewCard from './ReviewCard'
type props = {
    promptData:any
}

let tabs = [
    {
      title:"Description",
    },
    {
        title:"Reviews",
    },
    {
        title:"Author",
    }
]
const PromptInformation = ({promptData}:props)=>{
        //console.log("Prompts" , promptData)
        const [shopDatas , setShopData] = useState<any>("")
    
        useEffect(()=>{
          if(promptData){
            getShopInfo()
          }
        },[promptData])
    
        const getShopInfo = async ()=>{
            const shopData = await getShopById({shopId:promptData?.sellerId})
             //console.log("ShopData" , shopData?.avatar)
            setShopData(shopData)
        }
    return(
        <div>
            <div className="flex w-full flex-col bg-slate-900 p-3 rounded-md">
                <Tabs items={tabs} color="primary" variant='light'>
                      {
                        (item)=>(
                            <Tab key={item.title} title={item.title} className="text-[18px]  " >
                               <Divider className="bg-[#ffffff18" />
                               <div className="py-2">
                                {
                                    item.title === "Description" && (
                                        <p className={`${styles.paragraph} whitespace-pre-line w-full overflow-hidden`} >
                                            {promptData.description} </p>
                                    )
                                }
                                {
                                    item.title === "Author" && (
                                       
                                        <div className="flex my-2 ">
                                            <div>
                                            <Avatar size="lg" src={shopDatas?.avatar}  />
                                            </div>
                                        <div>
                                        <span className={`${styles.label} pl-3 !text-xl text-white `} >@{shopDatas?.name}</span>
                                        <br/>
                                        <span className={`${styles.label} pl-3 `} > Prompts : {shopDatas?.allProducts} </span>
                                        <br/>
                                        <span className={`${styles.label} pl-3 `} > Reviews : {shopDatas?.rating} / 5 </span>
                                        </div>
                                        </div>
                                    
                                    )
                                }
                                 {item.title === "Reviews" && (
                  <div className="">
                    {promptData &&
                      promptData.reviews.map((item:any, index:number) => (
                        <ReviewCard item={item} key={index} shopDatas={shopDatas} />
                      ))}

                      {
                        promptData?.reviews?.length === 0 && (
                          <h5 className={`${styles.paragraph} text-center py-5`}>
                            No Reviews have to show!
                          </h5>
                        )
                      }
                  </div>
                )}
                               </div>
                            </Tab>
                        )
                      }
                      
                </Tabs>

            </div>
        </div>
        
    )
}

export default PromptInformation