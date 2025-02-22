"use client"
import React from 'react';
import ShopSlider from "@/components/Shop/ShopSlider"


const Page = () => {
  return (
    <div className="flex w-full" >
      <div className="h-screen flex   md:w-[40%] 2xl:w-[17%] " >
     <ShopSlider active={0} />
        </div>
        <div className="md:w-[60%] 2xl:w-[83%] " >
          

          </div>
    </div>
  );
};

export default Page;
