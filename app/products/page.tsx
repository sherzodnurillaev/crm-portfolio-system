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

interface ProductsPageProps {
    searchParams?: {
        title?: string;
        category?: string;
    };
}

export default async function Products({ searchParams }: ProductsPageProps) {
    const data: Props[] = await getProducts({
        title: searchParams?.title,
        category: searchParams?.category,
    });

    return (
        <div className="">
            <h1 className="text-[36px]">Products page</h1>
            <Search />
            <OrderProducts data={data} />
        </div>
    );
}
