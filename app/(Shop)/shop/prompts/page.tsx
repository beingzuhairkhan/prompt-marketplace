'use client'

import ShopSlider from "@/components/Shop/ShopSlider"
import AllPrompts from '@/components/Prompts/AllPrompts'
const Page = ()=>{
    return(
        <div className="flex w-full" >
            <div className="h-screen flex p-2 bg-[#111c42] md:w-[20%] 2xl:w-[17%] ">
                <ShopSlider active={2} />
            </div>
          <div className="md:w-[80%] 2xl:w-[83%] p-5 " >
            <AllPrompts/>
          </div>
            



        </div>
    )
}

export default Page