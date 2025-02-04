'use client';

import Ratings from '@/utils/Ratings';
import { styles } from '@/utils/styles';
import { Button, Chip } from '@nextui-org/react';
import Image from 'next/image';
import { useState } from 'react';
import Marquee from 'react-fast-marquee';
import { IoCloseOutline } from 'react-icons/io5';
import {Elements} from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'
type Props = {
  promptData: any;
  stripePromise:any;
  clientSecret:string
};

const PromptDetailsCard = ({ promptData , stripePromise , clientSecret  }: Props) => {
  const [activeImage, setActiveImage] = useState(promptData.images[0]?.url);
  const [open , setOpen] = useState(false)
  const tags = promptData?.tags || '';
  const tagList = tags.split(',').map((tag: string) => tag.trim());
  //console.log("promptData " , promptData  )
  // console.log("stripePromise " ,  stripePromise )
  // console.log("clientSecret " , clientSecret)

  return (
    <div className="bg-[#1211023] p-6 w-full  shadow rounded-xl mt-8">
      <div className="w-full flex flex-wrap md:flex-nowrap">
        {/* Left Section */}
        <div className="md:w-1/2 w-full m-2">
          <Image
            src={activeImage}
            width={500}
            height={500}
            alt="Prompt"
            className="rounded-xl"
          />
          <div className="w-full mt-4">
            <Marquee>
              {promptData.images.map((image: any) => (
                <Image
                  src={image.url}
                  key={image.url}
                  height={100}
                  width={100}
                  alt="Thumbnail"
                  onClick={() => setActiveImage(image.url)}
                  className="m-2 cursor-pointer rounded-md border border-gray-500"
                />
              ))}
            </Marquee>
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 w-full m-2">
          <h1 className={`${styles.label} font-Montserrat !text-4xl  `}>
            {promptData?.name}
          </h1>
          <div className="flex items-center my-4">
            <Chip className="bg-[#1f2d2b] rounded-md p-3 h-[35px]">
              <span className="!text-2xl !text-[#64ff4b] font-Montserrat">10%</span>
            </Chip>
            <span className="!text-2xl pl-2 !text-[#64ff4b] font-Montserrat">Off</span>
          </div>
          <div className="flex items-center justify-between my-4">
            <div>
              <span className="inline-block text-gray-500 line-through">${promptData?.estimatedPrice}</span>
              <span className="inline-block text-white text-xl pl-3">${promptData?.price}</span>
            </div>
            <Ratings rating={promptData?.rating} />
          </div>
          <p className={`${styles.paragraph} my-4`}>{promptData?.shortDescription}</p>
          <div>
            <h3 className="text-white text-xl font-Montserrat mb-2">Tags</h3>
            <div className="flex flex-wrap">
              {tagList.map((tag: string) => (
                <Chip
                  key={tag}
                  className="bg-[#1f2d2b] rounded-full p-3 h-[35px] mr-2 my-2 cursor-pointer"
                >
                  <span className="!text-white !text-sm font-Montserrat">{tag}</span>
                </Chip>
              ))}
            </div>
          </div>
          <Button className="bg-[#64ff4b] mt-6 font-medium text-indigo-900 rounded-full h-[45px]" onClick={()=>setOpen(!open)} >
            Buy now ${promptData?.price}
          </Button>
        </div>
      </div>
      {
        open && (
          <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center">
          <div className="w-[500px] min-h-[500px] bg-white rounded-xl shadow p-3">
              <div className="w-full flex justify-end">
                  <IoCloseOutline size={40} className="text-black cursor-pointer" onClick={() => setOpen(!open)} />
              </div>
              {stripePromise && clientSecret && promptData && (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                      <CheckoutForm setOpen={setOpen} open={open} promptData={promptData}/>
                  </Elements>
              )}
          </div>
      </div>
      
        )
      }
    </div>
  );
};

export default PromptDetailsCard;
