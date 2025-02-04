"use client";
import React, { useState } from 'react';
import { styles } from '@/utils/styles';
import { Input, Textarea, Button } from '@nextui-org/react';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { toast } from "react-hot-toast";
import { redirect } from 'next/navigation';
type Props = {};

const Page = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  
  const [shopData, setShopData] = useState({
    name: "",
    description: "",
    shopProductType: "",
    avatar: "",
  });

  // Handler for updating the state when input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShopData({
      ...shopData,
      [name]: value,
    });
  };

  // Handler for form submission
  const handleInputSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (user) {
      const data = {
        name: shopData.name,
        description: shopData.description,
        shopProductType: shopData.shopProductType,
        avatar: user.imageUrl || '',
        userId: user.id,
      };

      // console.log("USER", data);

      try {
        await axios.post("/api/create-shop", data);
        setLoading(false);
        toast.success("Shop Created Successfully");
        setShopData({
          name: "",
          description: "",
          shopProductType: "",
          avatar: "",
        });
        redirect("/")
      } catch (error) {
        setLoading(false);
        // console.error(error);
        toast.success("Shop Created Successfully");
        redirect("/")
        setShopData({
          name: "",
          description: "",
          shopProductType: "",
          avatar: "",
        });
      }
    }
  };

  return (
    <div className="w-full h-screen flex flex-col p-16">
      <div>
        <h1 className={`${styles.heading} text-center font-Monserrat`}>
          Start selling with us
        </h1>
        <form className="2xl:w-[40%] xl:w-[50%] md:w-[70%] w-[90%] m-auto" onSubmit={handleInputSubmit}>
          <div className="w-full my-5 text-white">
            <label className={`${styles.label} mb-2 block`}>Shop Name</label>
            <Input
              name="name"
              isRequired
              type="text"
              value={shopData.name}
              onChange={handleInputChange}
              size="sm"
              label="Promptbuy"
              variant="bordered"
            />
          </div>
          <div className="w-full my-5">
            <label className={`${styles.label} mb-2 block`}>Shop Description (Max 120 letters)</label>
            <Input
              name="description"
              isRequired
              type="text"
              value={shopData.description}
              onChange={handleInputChange}
              size="sm"
              label="Promptbuy"
              maxLength={120}
              variant="bordered"
            />
          </div>
          <div className="w-full my-5">
            <label className={`${styles.label} mb-2 block`}>What you wanna sell with us?</label>
            <Textarea
              name="shopProductType"
              isRequired
              type="text"
              value={shopData.shopProductType}
              onChange={handleInputChange}
              className="col-span-12 md:col-span-6 md:mb-0"
              variant="bordered"
            />
          </div>
          <br />
          <Button
            className={`${styles.button} mb-3 w-full bg-transparent h-[45px] border border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF] hover:text-black duration-300 transition-opacity`}
            type="submit"
            disabled={loading}
            disableAnimation={loading}
          >
            Create Shop
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Page;
