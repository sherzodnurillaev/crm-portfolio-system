import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const category = searchParams.get("category");
        const title = searchParams.get("title");

        const products = await prisma.product.findMany({
            where: {
                ...(category ? { category } : {}),
                ...(title ? { title: { contains: title, mode: "insensitive"} } : {}),
            },
        });

        return new Response(JSON.stringify(products), {status: 200});
    } catch (error) {
        console.log(error);
        return new Response("Error fetching products", { status: 500})
        
    }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const product = await prisma.product.create({
      data: {
        title: body.title,
        category: body.category,
        price: body.price,
        imagePath: body.imagePath,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Ошибка при создании продукта" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const { id, title, category, price, imagePath } = body;

        if (!id) {
            return new Response("ID is required", {status: 400})
        }

        const updatedProduct = await prisma.product.update({
            where: {id: Number(id)},
            data: {
                ...(title && {title}),
                ...(category && {category}),
                ...(price && { price }),
                ...(imagePath && { imagePath }),
            },
        });

        return new Response(JSON.stringify(updatedProduct), {status: 200});
    } catch (error) {
        console.error(error);
        return new Response("Error updating product", {status: 500});
    }
}

export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = Number(url.searchParams.get("id"));

  if (!id) return NextResponse.json({ error: "ID обязателен" }, { status: 400 });

  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
