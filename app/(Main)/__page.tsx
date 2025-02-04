'use client'
import React, { useState, useEffect } from 'react';
import Header from '@/components/Layout/Header'
import Hero from '@/components/Route/Hero'
import Image from 'next/image'
import About from '@/components/Route/About'
import { styles } from '@/utils/styles'
import PromptCard from "@/components/Prompts/PromptCard"
import BestSellers from '@/components/Shop/BestSellers'
import Future from '@/components/Route/Future'
import Partners from '@/components/Route/Partners'
import SellerBanner from '@/components/Shop/SellerBanner'
import { Divider } from '@nextui-org/react';
import Footer from '@/components/Layout/Footer'
// import axios from 'axios'
// import Loaders from '@/utils/Loaders'
// import { getUser } from '@/actions/user/getUser';
import type { User } from '@clerk/nextjs/server';
type Props = {
  activeItem: number;
  user : User | undefined;
  isSellerExists:boolean;
  promptsData:any
}

const RoutePage = ({user , isSellerExists , promptsData}:Props) => {

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }

  }, [isMounted])

  if (!isMounted) {
    return null;
  }

  // useEffect(() => {
  //   setLoading(true)
  //   axios.get("/api/me").then((res) => {
  //     setUser(res.data)
  //     setIsSellerExists(res.data.shop ? true : false)
  //     setLoading(false)
  //     // console.log(res.data)
  //   }).catch((error) => {
  //     // console.log(error)
  //     setLoading(false)
  //   })
  // }, [])


 
  // useEffect(()=>{
  //   userData()
  // })
 


  return (
    // <>
    // {
    //   loading ? (<>
    //   <Loaders/>
    //   </>) :
    //   (
        <div>
        <div className="banner">
        <Header activeItem={0} user={user} isSellerExists={isSellerExists} />
        <Hero/>
        </div>
        <Image 
          src={"https://pixner.net/aikeu/assets/images/footer/shape-two.png"}
        width={120}
        height={120}
        alt=""
        className="absolute right-[-30px]"
        />
        <div className="w-[95%] md:w-[90%] xl:w-[80%] 2xl:w-[75%] m-auto  ">
          <About/>
          <div className="w-[99%] md:w-[98%] xl:w-[100%] 2xl:[85%]  ">
            <h1 className={`${styles.heading} p-2 `} > 
              Latest Prompts
            </h1>
            <div className=" w-full mt-5 flex flex-wrap ">
                {
                    promptsData  && promptsData.length > 0 && promptsData.map((prompt:any)=>(

                        <PromptCard key={prompt.id} prompt={prompt} />
                    ))
                }
            
              
            </div>
            <br/>
            <BestSellers/>
            <Future/>
            <Partners/>
            <SellerBanner/>
            <br/>
            <br/>
            <Divider className="bg-[#ffffff23]" />
            <Footer/>
          </div>
     
    
        </div>
          
        </div>
    //   )
    // }
    // </>
  );
};

export default RoutePage;
