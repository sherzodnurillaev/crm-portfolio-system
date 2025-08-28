import { Product } from "@/types/product";
import { useState, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Product | null;
  onSubmit: (product: Product) => void;
}

const Modal = ({ isOpen, onClose, initialData, onSubmit }: ModalProps) => {
  const [formData, setFormData] = useState<Omit<Product, "id">>({
    title: "",
    category: "",
    price: 0,
    imagePath: "",
  });
  const [preview, setPreview] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        category: initialData.category,
        price: initialData.price,
        imagePath: initialData.imagePath,
      });
      setPreview(initialData.imagePath);
    } else {
      setFormData({ title: "", category: "", price: 0, imagePath: "" });
      setPreview("");
    }
    setError("");
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "price") {
      const cleanValue = value.replace(/[^0-9.]/g, "");
      setFormData({ ...formData, price: Number(cleanValue) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPreview(base64);
      setFormData({ ...formData, imagePath: base64 });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (
      !formData.title.trim() ||
      !formData.category.trim() ||
      !formData.price ||
      !formData.imagePath
    ) {
      setError("Пожалуйста, заполните все поля корректно!");
      return;
    }
    setError("");
    onSubmit({ ...formData });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-40 bg-black/75">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">
          {initialData ? "Изменить товар" : "Добавить товар"}
        </h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Название"
          className="w-full border p-2 mb-2 border-amber-600 rounded-[8px]"
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Категория"
          className="w-full border p-2 mb-2 border-amber-600 rounded-[8px]"
        />
        <input
          type="text"
          name="price"
          value={formData.price || ""}
          onChange={handleChange}
          placeholder="Цена"
          className="w-full border p-2 mb-2 border-amber-600 rounded-[8px]"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full mb-2 cursor-pointer"
        />
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-full h-40 object-contain mb-4 rounded-[8px]"
          />
        )}

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded"
          >
            Отмена
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-amber-600 text-white rounded"
          >
            {initialData ? "Сохранить" : "Добавить"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
