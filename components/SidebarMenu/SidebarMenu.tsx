'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

const menu = [
  { id: 1, title: "Главное", link: "/" },
  { id: 2, title: "Товары", link: "/products" },
]

const SidebarMenu = () => {
  const pathname = usePathname()

  return (
    <div suppressHydrationWarning className="flex flex-col mx-[30px] gap-[20px] mt-[50px]">
      {menu.map((item) => {
        const isActive = pathname === item.link
        return (
          <Link
            key={item.id}
            href={item.link}
            className={`rounded-[8px] px-[20px] text-[#fff] py-[5px] hover:bg-[#fff] hover:text-[#000] ${
              isActive ? "bg-[#fff] !text-[#000]" : ""
            }`}
          >
            {item.title}
          </Link>
        )
      })}
    </div>
  )
}

export default SidebarMenu
