export interface Product {
  id?: number;
  title: string;
  price: number;
  category: string;
  imagePath?: string;
}

const API_URL = "/api/products";

export async function getProducts(params?: { title?: string; category?: string }) {
  const query = new URLSearchParams();
  if (params?.title) query.append("title", params.title);
  if (params?.category) query.append("category", params.category);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/products?${query.toString()}`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    console.error("Ошибка при fetch /api/products:", res.status);
    return [];
  }

  return res.json();
}

export async function createProduct(product: Product) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Ошибка при добавлении товара");
  return res.json();
}

export async function updateProduct(product: Product) {
  const res = await fetch(API_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Ошибка при изменении товара");
  return res.json();
}

export async function deleteProduct(id: number) {
  const res = await fetch(`${API_URL}?id=${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Ошибка при удалении товара");
  return res.json();
}
