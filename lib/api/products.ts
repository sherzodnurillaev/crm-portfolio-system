import { prisma } from '@/lib/prisma';

export interface Product {
    id?: number;
    title: string;
    price: number;
    category: string;
    imagePath?: string;
}

// Получение всех продуктов (с фильтром)
export async function getProducts(params?: { title?: string; category?: string }) {
    return prisma.product.findMany({
        where: {
            title: params?.title ? { contains: params.title } : undefined,
            category: params?.category ? { equals: params.category } : undefined,
        },
    });
}

// Создание продукта
export async function createProduct(product: Product) {
    const data: any = {
        title: product.title,
        price: product.price,
        category: product.category,
    };

    if (product.imagePath) {
        data.imagePath = product.imagePath;
    }

    return prisma.product.create({ data });
}

// Обновление продукта
export async function updateProduct(product: Product) {
    if (!product.id) throw new Error("ID обязателен");

    return prisma.product.update({
        where: { id: product.id },
        data: {
            title: product.title,
            price: product.price,
            category: product.category,
            imagePath: product.imagePath,
        },
    });
}

// Удаление продукта
export async function deleteProduct(id: number) {
  const res = await fetch(`/api/products?id=${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Ошибка при удалении товара");
  return res.json();
}
