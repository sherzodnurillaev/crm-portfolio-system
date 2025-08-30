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
  searchParams?: { title?: string; category?: string };
}) {
  const params = searchParams ?? {};

  let products: any[] = [];
  try {
    const response = await getProducts({
      title: params.title,
      category: params.category,
    });

    products = Array.isArray(response) ? response : [];
  } catch (err) {
    console.error("Ошибка при получении продуктов:", err);
    products = [];
  }

  const data: Props[] = products.map((product) => ({
    id: product.id,
    title: product.title,
    category: product.category,
    price: product.price,
    imagePath: product.imagePath ?? "",
  }));

  return (
    <div>
      <h1 className="text-[36px]">Home page</h1>
      <Search />
      <HomeProducts data={data} />
    </div>
  );
}
