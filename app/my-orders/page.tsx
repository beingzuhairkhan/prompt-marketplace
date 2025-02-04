import { getUserOrders } from "@/actions/orders/getUserOrders"
import UserAllOrders from './__page'
import { getUser } from "@/actions/user/getUser";
const Page = async ()=>{

    const data = await getUserOrders()
    const userData = await getUser()
    // console.log("order , data client" , data )
    return(
        <div>
            {/* <Header activeItem={0} user={userData?.user} isSellerExists={userData?.shop ? true : false}  /> */}
            <UserAllOrders data={data} user={userData?.user} isSellerExists={userData?.shop ? true : false} />

        </div>
    )
}

export default Page