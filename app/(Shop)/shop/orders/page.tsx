

import ShopSlider from "@/components/Shop/ShopSlider"
// import ShopAllOrders from '../../../../components/Shop/ShopAllOrders'
import ShopAllOrders from '@/components/Shop/ShopAllOrders'
import { getShopOrders } from "@/actions/orders/getShopOrders"
import { getUser } from "@/actions/user/getUser"
const Page = async()=>{
    const sellerId = await getUser()
//    console.log("sellerId" ,sellerId)
   const seller = sellerId?.user
  // console.log("sellerId" ,seller)

     const ordersData = await getShopOrders({sellerId:sellerId?.user?.id!})
    // console.log("ordersData" ,ordersData)
    return(
        <div className="flex w-full" >
            <div className="h-screen flex p-2 bg-[#111c42] md:w-[20%] 2xl:w-[17%] ">
                <ShopSlider active={3} />
            </div>
          <div className="md:w-[80%] 2xl:w-[83%] p-5 " >
           <ShopAllOrders isDashboard={false} ordersData={ordersData} sellerId={seller} />
          </div>
            



        </div>
    )
}

export default Page