 import { Avatar, Card, Skeleton } from "@nextui-org/react";
import React from 'react';
import { styles } from '@/utils/styles'
import Ratings from '@/utils/Ratings'
type Props = {
  item?: any;
  loading: boolean;
};

const SellerCard = ({ item, loading }: Props) => {
  console.log("items " , item)
  return (
    <Card className="py-4 bg-[#100d21] m-3 w-full md:max-w-[200%] 2xl:max-w-[200%] flex justify-evenly items-center text-white border border-[#ffffff22]" > 
 {loading ? (
        <>
          <Skeleton className="w-[80px] h-[80px] rounded-full" />
          <br />
          <Skeleton className="w-[90%] rounded-xl h-[20px]" />
          <br />
          <Skeleton className="w-[90%] rounded-xl h-[20px]" />
        </>
      ) : (
        <>
          <Avatar 
            src={item?.avatar}
            className="w-[80px] h-[80px]"
            />
            <span className={`${styles.label} py-2ntext-xl`} >@{item?.name}</span>
            <div className="flex items-center" >
                <span className={`${styles.label} pr-2`}  >{item?.rating}/5
                </span>
                    <Ratings rating={item?.rating} />
            </div>
                <span className={`${styles.label} py-2`} >Total Sales: {item?.totalSales}</span>
                </>
      )}
    </Card>
  );
};

export default SellerCard;
