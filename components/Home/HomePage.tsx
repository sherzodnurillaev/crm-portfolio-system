'use client'

import Image from "next/image";

interface Props {
  id: number;
  title: string;
  category: string;
  price: number;
  imagePath: string;
}

interface HomeProductsProps {
  data: Props[];
}

const HomeProducts = ({ data }: HomeProductsProps) => {

    console.log(data);
    
    
    return (
        <div className="grid grid-cols-4 gap-5">
            {
                data.map((item) => (
                    <div key={item.id} className=" overflow-hidden rounded-2xl relative">
                        <div className="absolute right-[10px] top-[10px] bg-red-600 text-[#fff] rounded-[6px]">
                            <h2 className="text-[12px] px-[5px]">{item.category}</h2>
                        </div>
                        <Image src={item.imagePath} width={300} height={300} alt={item.title} />
                        <div className="px-[20px] pt-[5px] pb-[15px] bg-gray-300">
                            <h2>{item.title}</h2>
                            <p>Цена: ${Math.round(item.price)}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default HomeProducts
