import React, { useEffect, useState } from 'react';
import {Avatar, Card, Divider , Button} from '@nextui-org/react'
import Image from 'next/image'
import {styles} from '@/utils/styles'
import Ratings from '@/utils/Ratings'
import Link from 'next/link';
import { getShopById } from '@/actions/shop/getShopById';
type Props = {
    prompt:any;
}

const PromptCard = ({prompt}:Props) => {
    // console.log("Prompts" , prompt)
    // const [shopDatas , setShopData] = useState<any>("")

    // useEffect(()=>{
    //   if(prompt){
    //     getShopInfo()
    //   }
    // },[prompt])

    // const getShopInfo = async ()=>{
    //     const shopData = await getShopById({shopId:prompt?.sellerId})
    //     // console.log("ShopData" , shopData)
    //     setShopData(shopData)
    // }
  return (
    <Card radius='lg'   className="w-full md:w-[24%] md:max-h-[600] 2xl:w-[32%] max-h-[640px] p-4 bg-[#130f23] m-3" >
        <div className="relative h-full" >
            <Image 
              src={prompt?.images[0]?.url}
              width={300}
              height={300}
              alt=""
             className="w-full "
            />
            <div className="absolute  bottom-2 left-2">
            <div className="w-max bg-black hover:bg-[#16252] duration-300 transition-opacity hover:text-black text-white p-[10px] items-center flex rounded-xl">
                    <Image 
                         src='https://pixner.net/aikeu/assets/images/category/chat.png'
                         width={20}
                         height={20}
                         alt=""
                    
                    />
                    <span className={`${styles.label} pl-2 text-white`} >{prompt?.tags}</span>
                </div>
            </div>

        </div>
        <div className="w-full flex justify-between py-2 ">
            <h3 className={`${styles.label} text-[18px] text-white `}>
               {prompt?.name}
            </h3>
            <p className={`${styles.paragraph} `} >${prompt?.price}</p>
        </div>
        <Divider className="bg-[#ffffff18] my-3 "  />
        <div className="w-full flex items-center justify-between">
        <div className=" flex items-center ">
            <Avatar 
            src={prompt?.shop?.avatar}
            />
            <span className={`${styles.label} pl-3 `} >@{prompt?.shop?.name} </span>
            </div>
                <Ratings rating={prompt?.rating} />
            
        </div>
        <br/>
        <Link href={`/prompt/${prompt.id}`} className="w-full mb-13" >
        <Button className={`mb-13 w-full bg-transparent border border-[#00BFFF] hover:bg-[#00BFFF] hover:text-black duration-300 transition-opacityfont-Inter font-[600] text-white `} >
            Get Prompts
        </Button>
        </Link>

    </Card>
  );
};

export default PromptCard;
