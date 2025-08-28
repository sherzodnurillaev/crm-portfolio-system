'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const Search = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [value, setValue] = useState("");

    useEffect(() => {
        const title = searchParams.get("title") || "";
        setValue(title);
    }, [searchParams]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/?title=${encodeURIComponent(value)}`);
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 items-center">
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Поиск..."
                className="border p-2 rounded-[6px] w-[100%] my-[20px]"
            />
            <button
                type="submit"
                className="bg-amber-600 text-white px-4 py-2 rounded"
            >
                Поиск
            </button>
        </form>
    )
}

export default Search;
