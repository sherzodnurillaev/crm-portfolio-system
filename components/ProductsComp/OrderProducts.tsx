'use client'

import { deleteProduct, createProduct, updateProduct } from "@/lib/api/products";
import Image from "next/image";
import { useState } from "react";
import Modal from "../ui/Modal";
import { Product } from "@/types/product";

interface HomeProductsProps {
  data: Product[];
}

const OrderProducts = ({ data }: HomeProductsProps) => {
  const [products, setProducts] = useState<Product[]>(data || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении", error);
    }
  };

  const handleAdd = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

const handleSubmit = async (product: Product) => {
  try {
    let res;
    if (selectedProduct) {
      res = await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...product, id: selectedProduct.id }),
      });
    } else {
      res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
    }

    if (!res.ok) throw new Error("Ошибка при сохранении");

    const data = await res.json();
    if (selectedProduct) {
      setProducts(products.map(p => p.id === data.id ? data : p));
    } else {
      setProducts([...products, data]);
    }

    setIsModalOpen(false);
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center font-bold border-b p-2">
        <div className="w-8">№</div>
        <div className="w-20">Картинка</div>
        <div className="flex-1">Название</div>
        <div className="w-32">Категория</div>
        <div className="w-24">Цена</div>
        <div className="w-16">Опции</div>
      </div>

      {products.map((item, i) => (
        <div
          key={item.id}
          className="flex items-center border-b p-2 hover:bg-gray-50"
        >
          <div className="w-8">{i + 1}</div>
          <div className="w-20">
            <Image
              src={item.imagePath}
              width={70}
              height={50}
              alt={item.title}
              className="rounded-[10px]"
            />
          </div>
          <div className="flex-1">{item.title}</div>
          <div className="w-32">{item.category}</div>
          <div className="w-24">{Math.round(item.price)}</div>
          <div className="flex gap-3">
            <button onClick={() => handleDelete(item.id!)}>
              <Image
                src="/icon/delete.svg"
                width={30}
                height={30}
                alt="Удалить"
              />
            </button>
            <button onClick={() => handleEdit(item)}>
              <Image
                src="/icon/add.svg"
                width={30}
                height={30}
                alt="Изменить"
              />
            </button>
          </div>
        </div>
      ))}

      <div className="p-4">
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          + Добавить товар
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={selectedProduct}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default OrderProducts;
