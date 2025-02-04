import React from 'react';
import Image from 'next/image'
import line from '@/public/Assets/line.png'
import Marquee from 'react-fast-marquee'
type Props = {}

const rowOneImages = [
    {
      url: "https://pixner.net/aikeu/assets/images/banner/large-slider/one.png",
    },
    {
      url: "https://pixner.net/aikeu/assets/images/banner/large-slider/two.png",
    },
    {
      url: "https://pixner.net/aikeu/assets/images/banner/large-slider/three.png",
    },
    {
      url: "https://pixner.net/aikeu/assets/images/banner/large-slider/four.png",
    },
    {
      url: "https://pixner.net/aikeu/assets/images/banner/large-slider/five.png",
    },
  ];
  
  const rowTwoImages = [
    {
      url: "https://pixner.net/aikeu/assets/images/banner/small-slider/one.png",
    },
    {
      url: "https://pixner.net/aikeu/assets/images/banner/small-slider/two.png",
    },
    {
      url: "https://pixner.net/aikeu/assets/images/banner/small-slider/three.png",
    },
    {
      url: "https://pixner.net/aikeu/assets/images/banner/small-slider/four.png",
    },
    {
      url: "https://pixner.net/aikeu/assets/images/banner/small-slider/five.png",
    },
  ];

const Hero = () => {
  return (
    <div className="w-full  flex items-center justify-center" >
        <div  >
            <h1 className="text-3xl py-5 xl:text-7xl 2xl:text-8xl font-[700] text-center xl:leading-[80px] 2xl:leading-[100px] sm:mt-20 " >
                Make <span className="text-[#00BFFF]" > Ai Image </span> <br/>
                With your <br/> Imagination
            </h1>
            <div className="md:mt-5" >
                <Image src={line} alt="" className="absolute hidden md:block " width={2000} height={2}  />
            </div>
            <div className="w-[100vw] mb-5 md:mb-20 relative">
                <div className="rotate-[-4deg] mt-10 md:mt-[6.5rem] " >
                  <Marquee>
                    {
                        rowOneImages.map((i,index)=>(
                            <Image src={i.url} width={700} height={500} key={index} alt="" className="md:m-4 w-[250px] m-2 md:[500px] rounded-[20px]  "  />
                        ))
                    }
                    </Marquee>
                    <Marquee>
                    {
                        rowTwoImages.map((i,index)=>(
                            <Image src={i.url}  width={700} height={500} key={index} alt="" className="md:m-4 w-[250px] m-2 md:[500px] rounded-[20px]  " />
                        ))
                    }
                    </Marquee>

                </div>
            </div>
        </div>


    </div>
  );
};

export default Hero;
