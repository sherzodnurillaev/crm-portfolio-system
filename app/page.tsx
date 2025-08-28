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

interface HomePageProps {
  searchParams?: {
    title?: string;
    category?: string;
  };
}

export default async function Home({ searchParams }: HomePageProps) {
  const data: Props[] = await getProducts({
    title: searchParams?.title,
    category: searchParams?.category,
  });

  return (
    <div>
      <h1 className="text-[36px]">Home page</h1>
      <Search />
      <HomeProducts data={data} />
    </div>
  );
}
