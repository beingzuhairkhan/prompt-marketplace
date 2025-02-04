import React from 'react';
import { GoHome } from 'react-icons/go';
import { MdOutlineCreateNewFolder } from 'react-icons/md';
import { BsWallet2 } from 'react-icons/bs';
import { TbMoneybag } from 'react-icons/tb';
import { LiaFileInvoiceDollarSolid } from 'react-icons/lia';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { GoArrowSwitch } from 'react-icons/go';
import Link from 'next/link';
import { styles } from '@/utils/styles';

type Props = {
  active: number;
};

const sideBarItems = [
  {
    icon: <GoHome />,
    title: "Dashboard",
    href: "/my-shop",
  },
  {
    icon: <MdOutlineCreateNewFolder />,
    title: "Upload Prompt",
    href: "/shop/create-prompt",
  },
  {
    icon: <BsWallet2 />,
    title: "Prompts",
    href: "/shop/prompts",
  },
  {
    icon: <TbMoneybag />,
    title: "Orders",
    href: "/shop/orders",
  },
  {
    icon: <LiaFileInvoiceDollarSolid />,
    title: "Invoices",
    href: "/shop/invoices",
  },
  // {
  //   icon: <BiMoneyWithdraw />,
  //   title: "Withdraw Earnings",
  //   href: "/shop/withdraw",
  // },
  {
    icon: <GoArrowSwitch />,
    title: "Switch to user",
    href: "/",
  },
];

const ShopSlider = ({ active }: Props) => {
  return (
    <div className="w-64  bg-gray-900 text-white p-4 ">
      <ul className="space-y-2 mt-4">
        {sideBarItems.map((item, index) => (
          <li key={index}>
            <Link
              href={item.href}
              className={`flex mt-5 items-center p-2 rounded-md cursor-pointer ${
                active === index ? 'bg-gray-700' : 'hover:bg-gray-800'
              }`}
            >
              <div className="mr-3 text-xl">{item.icon}</div>
              <span className="flex-1 text-md pl-2">{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShopSlider;
