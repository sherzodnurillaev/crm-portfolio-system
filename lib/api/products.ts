export interface Product {
    id?: number,
    title: string,
    price: number,
    category: string,
    imagePath?: string 
}

const API_URL = 'http://localhost:3000/api/products'

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

    const res = await fetch(url, { cache: 'no-store' });

    if (!res.ok) throw new Error("Ошибка при загрузке товаров");

    return res.json();
}


export async function deleteProduct(id: number) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    })
    if (!res.ok) throw new Error("Ошибка при удалении товара")
        return res.json()
}
