import Search from "@/components/ui/SearchInput";
import OrderProducts from "@/components/ProductsComp/OrderProducts";
import { getProducts } from "@/lib/api/products";

export interface Props {
    id: number;
    title: string;
    category: string;
    price: number;
    imagePath: string;
}

export default async function Products({ searchParams }: { searchParams?: Promise<Record<string, string>> }) {
    const params = await searchParams;

    const data: Props[] = await getProducts({
        title: params?.title,
        category: params?.category,
    });

    return (
        <div className="">
            <h1 className="text-[36px]">Products page</h1>
            <Search />
            <OrderProducts data={data} />
        </div>
    );
}

