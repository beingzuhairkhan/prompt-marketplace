import React from 'react';
import Link from 'next/link';
type Props = {
    activeItem:number
}

const NavItem = [
    {
        title:"Home",
        href:"/"
    },
    {
        title:"About Us",
        href:"/about"
    },
    {
        title:"MarketPlace",
        href:"/marketplace"
    },
    {
        title:"Contact Us",
        href:"/contact"
    },
    {
        title:"Testimonial",
        href:"/testimonial"
    },
]

const MyComponent = ({activeItem}:Props) => {
  return (
    <div className="block md:flex " >
        {
            NavItem.map((item , index)=>(
                <Link href={item.href} className="" key={item.title}>
                    <h5 className={` md:px-4 xl:px-8 py-2 text-[18px] font-[500] font-Inter ${activeItem === index && 'text-[#00BFFF]'}  `}  >
                        {item.title}
                    </h5>
                </Link>
            ))
        }
      
    </div>
  );
};

export default MyComponent;
