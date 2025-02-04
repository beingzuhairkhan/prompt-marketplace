import { styles } from '@/utils/styles'
import Image from 'next/image'

type Props = {
    title : string
}
const ShopBanner = ({title}:Props) =>{
    return(
        <div className="w-full h-full flex items-center justify-center relative " >
            <div className="">
             <Image src={"https://pixner.net/aikeu/assets/images/banner/cmn-thumb-left.png"} width={180} height={180} alt="" className="absolute top-1 left-0"  />

            </div>
            <h4 className={`${styles.heading} font-Montserrat xl:text-6xl 2xl:text-7xl `} >
                {title}
            </h4>
            <div className="">
            <Image src={"https://pixner.net/aikeu/assets/images/banner/cmn-thumb-right.png"} width={180} height={180} alt="" className="absolute right-10 "  />
            </div>
            
        </div>
    )
}

export default ShopBanner