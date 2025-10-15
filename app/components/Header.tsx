"use client";
import Link from "next/link";
import { FaGem } from "react-icons/fa"; // icon viên kim cương
import { GiDiamondRing } from "react-icons/gi"; // icon nhẫn kim cương
export default function Header() {
  return (
    <header className="bg-red-700 text-yellow-300 py-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex flex-wrap justify-between items-center px-4 md:px-6">
        <h1 className="text-xl md:text-2xl font-bold tracking-wide flex items-center gap-2">
          <FaGem className="text-yellow-500" /> {/* icon vàng sang trọng */}
          Vàng Bạc Vân Anh
          <GiDiamondRing className="text-pink-400" /> {/* thêm 1 icon nhẫn */}
        </h1>
        <nav className="w-full md:w-auto flex justify-center md:justify-end mt-3 md:mt-0 space-x-4 md:space-x-6 text-sm md:text-base">
          <Link href="/home" className="hover:text-white transition">
            Trang chủ
          </Link>
          <Link href="/history" className="hover:text-white transition">
            Lịch sử
          </Link>
          <Link href="/info" className="hover:text-white transition">
            Thông tin
          </Link>
          <Link href="/product" className="hover:text-white transition">
            Sản phẩm
          </Link>
          <Link href="/info" className="hover:text-white transition">
            Liên hệ
          </Link>
        </nav>
      </div>
    </header>
  );
}
