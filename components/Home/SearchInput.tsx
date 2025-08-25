'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const Search = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [value, setValue] = useState("");

    // чтобы при загрузке страницы поле показывало значение из URL
    useEffect(() => {
        const title = searchParams.get("title") || "";
        setValue(title);
    }, [searchParams]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // передаём параметр title в URL
        router.push(`/?title=${encodeURIComponent(value)}`);
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 items-center">
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search..."
                className="border p-2 rounded-[6px] w-[100%] my-[20px]"
            />
            <button
                type="submit"
                className="bg-amber-600 text-white px-4 py-2 rounded"
            >
                Search
            </button>
        </form>
    )
}

export default Search;
