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

export default async function Products({
    searchParams,
}: {
    searchParams?: Promise<{ title?: string; category?: string }>;
}) {
    const resolvedParams = await searchParams; // дожидаемся Promise

    const data: Props[] = await getProducts({
        title: resolvedParams?.title,
        category: resolvedParams?.category,
    });

    return (
        <div className="">
            <h1 className="text-[36px]">Products page</h1>
            <Search />
            <OrderProducts data={data} />
        </div>
    );
}
