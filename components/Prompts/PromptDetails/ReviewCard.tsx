import Ratings from "@/utils/Ratings";
import { styles } from "@/utils/styles";
import { Avatar } from "@nextui-org/react";
import { format } from "timeago.js";

const  ReviewCard = ({item , shopDatas}:{item:any ; shopDatas:any})=>{
  console.log("shopDatas" , shopDatas)
  if (!shopDatas) {
    return <div>Loading...</div>;
  }
    return(
        <div className="flex ">
        <div>
          <Avatar size="lg" src={shopDatas?.avatar} />
        </div>
        <div className="pl-3">
          <div className="flex items-center">
            <span className={`${styles.label} !text-xl text-white`}>
              {/* {item?.user?.firstName + " " + item?.user.lastName!} */}
            </span>
            <span className={`${styles.label} pl-3`}>
              {format(item?.createdAt)}
            </span>
            <Ratings rating={item?.rating} />
          </div>
          <p className={`${styles.paragraph} whitespace-pre-line`}>
            {item?.comment}
          </p>
        </div>
      </div>
    )
}

export default ReviewCard ;