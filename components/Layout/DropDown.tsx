import React from 'react';
import { User } from '@clerk/nextjs/server';
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { styles } from '@/utils/styles';
import Link from 'next/link';
import { TbSwitchVertical } from 'react-icons/tb';
import { FiLogOut } from 'react-icons/fi'; // Import the logout icon
import { useClerk } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { GrDocumentStore } from 'react-icons/gr';
type Props = {
  user: User | null;
  setOpen: (open: boolean) => void;
  handleProfile: () => void;
  isSellerExists: boolean;
};

const DropDown: React.FC<Props> = ({ user, setOpen, handleProfile, isSellerExists }) => {
  const { signOut } = useClerk()
  const router = useRouter()
  const handleLogOut = async () => {
    await signOut();
    router.push("/sign-in");
  }
  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          src={user?.imageUrl || '/default-avatar.png'}
          alt={user ? `${user.firstName} ${user.lastName}'s profile picture` : 'Default avatar'}
          className="w-[40px] h-[40px] cursor-pointer"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant='flat'>
        <DropdownItem onClick={() => {
          handleProfile();
          setOpen(false);
        }}>
          <div className="flex w-full items-center">
            <Avatar src={user?.imageUrl} alt="User avatar" className="w-[30px] h-[30px] cursor-pointer" />
            <span className={`${styles.label} text-black text-[16px] pl-2`}>My Profile</span>
          </div>
        </DropdownItem>

        <DropdownItem >
          <Link href="/my-orders" className="flex w-full items-center">
            <GrDocumentStore className="text-xl ml-1 text-black" />
            <span className={`${styles.label} text-black text-[16px] pl-2`}>My orders</span>
          </Link>
        </DropdownItem>

        {isSellerExists ? (
          <DropdownItem key="seller">
            <Link href="/my-shop" className="flex w-full items-center">
              <TbSwitchVertical className="text-2xl ml-1 text-black" />
              <span className={`${styles.label} text-black text-[16px] pl-2`}>Switch to Seller</span>
            </Link>
          </DropdownItem>
        ) : <></>}






        <DropdownItem onClick={handleLogOut}>
          <div className="flex items-center ml-2 mt-1">
            <FiLogOut className="text-xl mr-2 text-black" /> {/* Logout icon */}
            <span className={`${styles.label} text-black text-[16px]`}>Log out</span>
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropDown;
{/* {isSellerExists && (
          <DropdownItem>
            <Link href="/my-shop" className="flex w-full items-center">
              <TbSwitchVertical className="text-2xl ml-1 text-black" />
              <span className={`${styles.label} text-black text-[16px] pl-2`}>Switching to Seller</span>
            </Link>
          </DropdownItem>
        )} */}


{/* <DropdownItem className={`${isSellerExists && "hidden"}`} >
            <Link href="/my-shop" className="flex w-full items-center">
              <TbSwitchVertical className="text-2xl ml-2 text-black" />
              <span className={`${styles.label} text-black text-[16px] pl-2`}>Switching to Seller</span>
            </Link>
          </DropdownItem> */}