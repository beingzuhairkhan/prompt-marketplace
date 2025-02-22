'use client'
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import {useState , useEffect} from  "react" ;
import { Divider } from "@nextui-org/react";
 const Page = ()=> {
  const user = undefined; 
  const isSellerExists = false; 
  const testimonials = [
    {
      quote:
        "Generate a futuristic cityscape with neon-lit skyscrapers and flying cars.",
        designation: "Sci-Fi",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Create an AI-generated poetry piece inspired by nature and deep emotions.",
        designation: "Creative Writing",
      src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Design a cyberpunk-style character with augmented reality glasses and a high-tech outfit.",
        designation: "Character Design",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Write a dystopian short story about AI gaining consciousness and reshaping society.",
        designation: "Storytelling",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Create an AI-generated logo for a futuristic startup using minimalistic design principles.",
        designation: "Graphic Design",
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return(
    <div>
      <div>
      <Header activeItem={4} user={user} isSellerExists={isSellerExists } />
      </div>
      <AnimatedTestimonials testimonials={testimonials} />
      <div>
      <Divider className="bg-[ffffff14] mt-5 " />
      <Footer/>
      </div>
    </div>
  )
}


export default Page