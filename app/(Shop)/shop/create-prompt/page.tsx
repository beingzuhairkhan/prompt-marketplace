"use client"
import React from 'react';
import ShopSlider from "@/components/Shop/ShopSlider"
import UploadPrompt from "@/components/Shop/UploadPrompt"
type Props = {}

const Page = () => {
  return (
    <div className="flex w-full" >
      <div className="h-screen sticky top-0 left-0 z-20 flex   md:w-[20%] 2xl:w-[17%] " >
     <ShopSlider active={1} />
        </div>
        <div className="md:w-[80%] 2xl:w-[83%] " >
          <UploadPrompt/>

          </div>
    </div>
  );
};

export default Page;
