'use client'

import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import FilterPrompt from "@/components/Prompts/FilterPrompt";
import PromptCard from "@/components/Prompts/PromptCard";
import ShopBanner from "@/components/Shop/ShopBanner";
import type { User } from "@clerk/nextjs/server";
import { Divider, Pagination } from "@nextui-org/react";
import {useState , useEffect} from  "react" ;
import {useRouter} from 'next/navigation'
import PromptCardLoader from "@/utils/PromptCardLoader";
const MarketPlaceRouter = ({user , isSellerExists , promptsData,totalPrompts }:{user:User | undefined ; isSellerExists:boolean ; promptsData:any ; totalPrompts:any })=>{
    const [isMounted , setisMounted] = useState(false)
    const [initialPage , setInitialPage] = useState(1)
    const [prompts, setPrompts] = useState<any>();
    // const [totalPrompts, setTotalPrompts] = useState<any>();
    const [loading, setLoading] = useState(true);
    const router = useRouter()
    // const fetchPromptsData = async () => {
    //   setLoading(true);
    //   try {
    //     const response = await fetch(`/api/get-prompts?page=${initialPage}`);
    //     const data = await response.json();
    //     setPrompts(data.prompts);
    //     setTotalPrompts(data.totalPrompts);
    //   } catch (error) {
    //     console.error("Failed to fetch prompts:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    useEffect(()=>{
        if(!isMounted){
            setisMounted(true)
        }
    }, [isMounted])
      useEffect(()=>{
      if(initialPage){
        router.push(`/marketplace?page=${initialPage}`)
      }
    },[initialPage , router])

    // useEffect(() => {
    //   fetchPromptsData();
    // }, [initialPage]);
  
    if(!isMounted){
        return null
    }

    const paginationsPages = Math.ceil(totalPrompts?.length / 8)
  
    return(
        <>
        <div className="shop-banner" >
            <Header activeItem={2} user={user} isSellerExists />
            <ShopBanner title="Our Shops" />
        </div>
        <div className="w-[95%] md:w-[90%] xl:w-[85%] 2xl:w-[80%] m-auto " >
              <div className="">
                <div className="w-full">
                  <FilterPrompt    setPrompts={setPrompts}
                totalPrompts={totalPrompts}/>
                </div>
                <div className="w-full flex flex-wrap mt-5">
              {/* {loading ? (
                [...new Array(8)].map((i) => (
                  <>
                    <PromptCardLoader />
                  </>
                ))
              ) : ( */}
                <>
                  {promptsData &&
                    promptsData.map((item: any) => (
                      <PromptCard prompt={item} key={item.id} />
                    ))}
                </>
              {/* )} */}
            </div>
             <div className="w-full flex items-center justify-center mt-5 ">
              <Pagination loop showControls total={paginationsPages} initialPage={initialPage} classNames={{
                wrapper:"mx-2" , item:"mx-2"
              }} onChange={setInitialPage} />
             </div>
             <Divider className="bg-[ffffff14] mt-5 " />
             <Footer/>
              </div>
        </div>
        </>
    )
}

export default MarketPlaceRouter