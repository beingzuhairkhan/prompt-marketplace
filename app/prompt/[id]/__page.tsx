'use client'

import { getAllPrompts } from "@/actions/prompts/getAllPrompts"
import { getUser } from "@/actions/user/getUser"
import Footer from "@/components/Layout/Footer"
import Header from "@/components/Layout/Header"
import ShopBanner from '@/components/Shop/ShopBanner'
import type { User } from "@clerk/nextjs/server"
import { Divider } from "@nextui-org/react"
import { useEffect, useState } from "react"
import PromptDetails from '@/components/Prompts/PromptDetails/PromptDetails'
import { stripePaymentIntent } from "@/actions/payment/paymentAction"
import {loadStripe} from '@stripe/stripe-js'
type Props = {
    user : User | undefined;
    isSellerExists:boolean;
    promptData:any;
    relatedprompt:any;
    publishableKey:string;
    
}

const PromptDetailPage =  ({user , isSellerExists , promptData , relatedprompt , publishableKey}:Props) => {
     const [isMounted, setIsMounted] = useState(false)
     const [stripePromise , setStripePromise] = useState<any>()
     const [clientSecret , setClientSecret] = useState<string | undefined>(undefined)
      useEffect(() => {
        if (!isMounted) {
          setIsMounted(true);
        }
    
      }, [isMounted])

      useEffect(()=>{
        if(publishableKey){
          const amount =Math.round(promptData?.price * 100 )
          newPaymentIntent({amount})
          setStripePromise(loadStripe(publishableKey))
        }
  
      },[publishableKey , promptData])
      
      const newPaymentIntent = async ({amount}:{amount:number})=>{
        const paymentIntent =  await stripePaymentIntent({amount})
        //console.log("paymentIntent" , paymentIntent)
        setClientSecret(paymentIntent?.clientSecret)
       }
    
      if (!isMounted) {
        return null;
      }

    return (
        <div>
            <div className="shop-banner" >
                <Header activeItem={2} user={user} isSellerExists={isSellerExists}  />
                <ShopBanner title="Animal" />

            </div>
            <div className="w-[95%] md:[80%] xl:[85%] 2xl:[80%] m-auto ">
                <PromptDetails promptData={promptData} relatedprompt={relatedprompt} stripePromise={stripePromise} clientSecret={clientSecret ?? ''} />
                <Divider className="bg-[#ffffff14] mt-5  "  />
                <Footer/>
            </div>
        </div>
    )
}

export default PromptDetailPage