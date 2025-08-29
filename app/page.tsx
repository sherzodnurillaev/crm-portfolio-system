import HomeProducts from "@/components/Home/HomePage";
import Search from "@/components/ui/SearchInput";
import { getProducts } from "@/lib/api/products";

export interface Props {
  id: number;
  title: string;
  category: string;
  price: number;
  imagePath: string;
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ title?: string; category?: string }>;
}) {
  const params = await searchParams;

  const data: Props[] = await getProducts({
    title: params?.title ?? "",
    category: params?.category ?? "",
  });

  return (
    <div>
      <h1 className="text-[36px]">Home page</h1>
      <Search />
      <HomeProducts data={data} />
    </div>
  );
}
