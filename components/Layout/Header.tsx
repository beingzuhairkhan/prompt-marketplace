

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { FaBars } from 'react-icons/fa';
import { useUser, UserProfile } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/server';
import DropDown from './DropDown';
import Navigation from './Navigation';
import { RxCross1 } from 'react-icons/rx';
import { UserResource } from '@clerk/types';

type Props = {
  activeItem: number;
  user: User | undefined;
  isSellerExists: boolean;
};

const Header = ({ activeItem, isSellerExists }: Props) => {
  const { user } = useUser(); // Get user from Clerk
  const [active, setActive] = useState(false); // Tracks scroll position
  const [open, setOpen] = useState(false); // Mobile menu state
  const [activeProfile, setActiveProfile] = useState(false); // Profile dropdown
  // const [isSellerExists, setIsSellerExists] = useState(false); 


  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Toggle profile dropdown
  const handleProfile = () => {
    setActiveProfile((prev) => !prev);
  };

  // Handle mobile menu close
  const handleClose = () => {
    setOpen(false);
  };

  // useEffect(()=>{
  //   if()
  // },[])

  return (
    <div
      className={`w-full p-5 border-b min-h-[60px] border-b-[#ffffff32] transition-opacity ${active ? 'fixed top-0 left-0 bg-[#000] z-[9999]' : ''
        }`}
    >
      {/* Desktop Header */}
      <div className="hidden md:w-[90%] mx-auto md:flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <h1 className="font-Inter text-3xl cursor-pointer">
            <span className="text-[#00BFFF]">Prompt</span>Bay
          </h1>
        </Link>

        {/* Navigation */}
        <Navigation activeItem={activeItem} />

        {/* Icons */}
        <div className="hidden md:flex items-center ml-10">
          <AiOutlineSearch className="text-[25px] mr-5 cursor-pointer" />
          {user ? (
            <DropDown
               user={user as unknown as User}
              setOpen={setOpen}
              handleProfile={handleProfile}
              isSellerExists={isSellerExists}
            />
          ) : (
            <Link href="/sign-up">
              <CgProfile className="text-[25px] cursor-pointer" />
            </Link>
          )}
        </div>
      </div>
      {
        activeProfile && (
          <div className="w-full fixed h-screen overflow-hidden flex justify-center items-center top-8 left-0 bg-[#00000068] z-[9999]" >
            <div className="w-min relative h-[90vh] overflow-y-scroll bg-white rounded-xl shadow   " >
              <UserProfile />
              <RxCross1
                className="absolute text-black text-2xl top-10 right-10 cursor-pointer"
                onClick={handleProfile}
              />
            </div>
          </div>
        )
      }

      {/* Mobile Header */}
      <div className="w-full md:hidden flex items-center justify-between ">
        {/* Logo */}
        <Link href="/">
          <h1 className="font-Inter text-3xl cursor-pointer">
            <span className="text-[#00BFFF]">Prompt</span>Bay
          </h1>
        </Link>

        {/* Hamburger Menu */}
        <FaBars className="text-2xl cursor-pointer" onClick={() => setOpen((prev) => !prev)} />

        {/* Mobile Menu */}
        {open && (
          <div
            className="fixed top-0 left-0 w-full flex flex-col space-y-4  h-screen z-[99999] bg-black/50"
            onClick={handleClose}
          >
            <div
              className="fixed top-0 right-0 w-[60%] h-screen bg-black z-[10000]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mt-20 pl-5 flex flex-col space-y-4">
                <Navigation activeItem={activeItem} />
                {
                  user && (
                    <DropDown
                    user={user as unknown as User}
                      setOpen={setOpen}
                      handleProfile={handleProfile}
                      isSellerExists={isSellerExists}
                    />
                  )
                }
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
