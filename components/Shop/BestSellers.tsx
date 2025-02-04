import React , {useState , useEffect} from 'react';
import { styles } from '@/utils/styles'
import SellerCard from './SellerCard'
type ShopData = {
  id: string;
  name: string;
  description: string;
  shopProductsType: string;
  avatar: string;
  ratings: Number;
  totalSales: Number;
  allProducts: Number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};


const BestSellers = () => {
  const [shopsData, setshopsData] = useState<ShopData[]>();
  const [loading, setloading] = useState(true);
  const fetchShopsData = async () => {
    try {
      const response = await fetch(`/api/get-top-sellers`);
      const data = await response.json();
      setshopsData(data);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  useEffect(() => {
    fetchShopsData();
  }, []);
  return (
    <div className="mb-10 cursor-pointer">
      <h1 className={`${styles.heading} p-2 mb-5`} >
        Top Sellers
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {loading
          ? [...new Array(8)].map((i) => (
              <div key={i}>
                <SellerCard loading={loading} />
              </div>
            ))
          : shopsData?.map((item: any) => (
              <SellerCard item={item} key={item.id} loading={loading} />
            ))}
  
  
</div>

    </div>
  );
};

export default BestSellers;
