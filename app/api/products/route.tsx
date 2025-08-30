
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") || undefined;
  const category = searchParams.get("category") || undefined;

  const products = await prisma.product.findMany({
    where: {
      title: title ? { contains: title } : undefined,
      category: category ? { equals: category } : undefined,
    },
  });

  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const { title, price, category, imagePath } = await req.json();
  const product = await prisma.product.create({
    data: { title, price, category, imagePath },
  });
  return NextResponse.json(product);
}

export async function PUT(req: NextRequest) {
  const { id, title, price, category, imagePath } = await req.json();
  if (!id) return NextResponse.json({ error: "ID обязателен" }, { status: 400 });

  const product = await prisma.product.update({
    where: { id },
    data: { title, price, category, imagePath },
  });
  return NextResponse.json(product);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID обязателен" }, { status: 400 });

  const product = await prisma.product.delete({ where: { id: Number(id) } });
  return NextResponse.json(product);
}
