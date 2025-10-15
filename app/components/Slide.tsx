"use client";
import { useEffect, useState } from "react";

const slidesData = [
  {
    title: "Vẻ đẹp vượt thời gian",
    desc: "Vàng Bạc Vân Anh – Nơi tôn vinh sự tinh tế và sang trọng",
  },
  {
    title: "Trang sức dành cho bạn",
    desc: "Mỗi món trang sức Vân Anh là điểm nhấn hoàn hảo cho phong cách của bạn",
  },
  {
    title: "Tinh xảo trong từng chi tiết",
    desc: "Chúng tôi tạo ra những tác phẩm độc đáo, phản ánh đẳng cấp và cá tính riêng",
  },
];

export default function Slide() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slidesData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden h-[150px] md:h-[220px] text-yellow-200">
      {slidesData.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-opacity duration-1000 ${
            i === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* 🔴 Nền gradient đỏ ánh vàng */}
          <div className="absolute inset-0 animate-gradient bg-[length:200%_200%] bg-gradient-to-r from-red-900 via-red-700 to-amber-500 opacity-90"></div>

          {/* ✨ Ánh sáng nhẹ ở trung tâm */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)] mix-blend-overlay animate-pulse"></div>

          {/* 🪞 Nội dung */}
          <div className="relative z-10 px-4 md:px-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-[0_0_10px_rgba(255,200,100,0.4)]">
              {s.title}
            </h2>
            <p className="text-base md:text-lg mb-6 text-yellow-100 drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]">
              {s.desc}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
