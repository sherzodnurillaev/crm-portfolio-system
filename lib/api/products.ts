export interface Product {
    id?: number,
    title: string,
    price: number,
    category: string,
    imagePath?: string 
}

const API_URL = '/api/products'

export async function createProduct(product: Product) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product)
    })

    if (!res.ok) {
        throw new Error("Ошибка при добавлении товара")
    }

    return res.json()
}

export async function getProducts(params?: { title?: string; category?: string }) {
    const query = new URLSearchParams();

    if (params?.title) query.append("title", params.title);
    if (params?.category) query.append("category", params.category);

    const url = query.toString()
        ? `${API_URL}?${query.toString()}`
        : API_URL;
        console.log(url);
        

    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) throw new Error("Ошибка при загрузке товаров");

    return res.json();
}

export async function PUT(req: Request) {
  const { id, title, price, category, imagePath } = await req.json();

  if (!id) {
    return new Response(
      JSON.stringify({ error: "ID обязателен" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(
    JSON.stringify({ message: "Product updated" }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
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
    const res = await fetch(`${API_URL}?id=${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Ошибка при удалении товара");

    const text = await res.text();
    console.log(text);
}
