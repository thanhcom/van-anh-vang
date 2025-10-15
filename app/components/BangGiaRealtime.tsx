"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { Database } from "../../types/supabase";

type BangGiaVang = Database["public"]["Tables"]["bang_gia_vang"]["Row"];

interface GiaVang {
  id: number;
  loai_vang: string;
  mua_vao: number;
  ban_ra: number;
  don_vi: string;
  updated_at: string;
}

/** ⚡ Hàm hiển thị "time ago" nhanh gọn */
function timeAgo(dateString: string): string {
  const diff = (Date.now() - new Date(dateString).getTime()) / 1000;
  if (diff < 60) return `${Math.floor(diff)} giây trước`;
  if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)} ngày trước`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)} tháng trước`;
  return `${Math.floor(diff / 31536000)} năm trước`;
}

/** 🧩 Component chính */
export default function BangGiaRealtime({ initialData = [] }: { initialData?: GiaVang[] }) {
  const [bangGia, setBangGia] = useState<GiaVang[]>(initialData);
  const [loading, setLoading] = useState(initialData.length === 0);
  const [tick, setTick] = useState(0);
  const [now, setNow] = useState(new Date());

  /** ⏰ Cập nhật giờ mỗi giây */
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  /** 1️⃣ Lấy dữ liệu ban đầu nếu chưa có (SSR fallback + realtime ready) */
  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      if (initialData.length === 0) {
        const { data, error } = await supabase
          .from("bang_gia_vang")
          .select("*")
          .order("id", { ascending: true }); // giữ thứ tự theo ID
        if (!error && data && mounted) {
          setBangGia(data);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchData();

    /** 2️⃣ Đăng ký realtime cập nhật tự động */
    const channel = supabase
      .channel("realtime:bang_gia_vang")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bang_gia_vang" },
        (payload) => {
          setBangGia((prev) => {
            switch (payload.eventType) {
              case "UPDATE":
                return prev.map((r) =>
                  r.id === payload.new.id ? (payload.new as GiaVang) : r
                );
              case "INSERT":
                return [...prev, payload.new as GiaVang];
              case "DELETE":
                return prev.filter((r) => r.id !== payload.old.id);
              default:
                return prev;
            }
          });
        }
      )
      .subscribe();

    /** 3️⃣ Tick cập nhật "time ago" mỗi phút */
    const interval = setInterval(() => setTick((t) => t + 1), 60000);

    return () => {
      mounted = false;
      clearInterval(interval);
      supabase.removeChannel(channel);
    };
  }, [initialData]);

  /** ⚠️ Loading khi chưa có dữ liệu */
  if (loading) {
    return (
      <section className="py-12 bg-yellow-50 text-center">
        <p className="text-red-700 font-bold text-xl animate-pulse">
          Đang tải bảng giá vàng hôm nay...
        </p>
      </section>
    );
  }

  /** ✅ Render bảng giá */
  return (
    <section className="py-8 md:py-16 bg-yellow-50">
      <div className="container mx-auto px-3 md:px-12 text-center">
        {/* 🔹 Tiêu đề cũ giữ nguyên */}
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-red-700 mb-6 md:mb-8">
  Bảng giá vàng hôm nay  
  <span className="text-yellow-800 block mt-1">
    {new Date().toLocaleDateString("vi-VN", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })}
  </span>
</h3>      

        {/* 🔹 Đơn vị & thời gian (căn trái) */}
        <div className="text-yellow-800 text-lg font-semibold mb-6 leading-tight text-left">
          <p>Đơn vị tính: Nghìn VNĐ/Chỉ</p>
          <p>
            {now.toLocaleDateString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}{" "}
            –{" "}
            {now.toLocaleTimeString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            })}
          </p>
        </div>

        {/* 🔹 Bảng giá */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-xl rounded-xl overflow-hidden text-sm sm:text-base md:text-lg">
            <thead className="bg-red-700 text-white text-sm sm:text-base md:text-2xl font-bold">
              <tr>
                <th className="py-3 sm:py-4 px-3 sm:px-6">Loại vàng</th>
                <th className="py-3 sm:py-4 px-3 sm:px-6">Mua vào</th>
                <th className="py-3 sm:py-4 px-3 sm:px-6">Bán ra</th>
                <th className="py-3 sm:py-4 px-3 sm:px-6">Cập nhật</th>
              </tr>
            </thead>
            <tbody>
              {bangGia.map((row) => {
                const isNew =
                  Date.now() - new Date(row.updated_at).getTime() < 5000;
                return (
                  <tr
                    key={row.id}
                    className={`border-b transition-colors duration-500 ${
                      isNew
                        ? "bg-yellow-100 animate-pulse"
                        : "hover:bg-yellow-200"
                    }`}
                  >
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-base sm:text-xl md:text-3xl text-red-700 font-extrabold">
                      {row.loai_vang}
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-base sm:text-xl md:text-3xl text-red-700 font-extrabold">
                      {row.mua_vao.toLocaleString("vi-VN")} {row.don_vi}
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-base sm:text-xl md:text-3xl text-red-700 font-extrabold">
                      {row.ban_ra.toLocaleString("vi-VN")} {row.don_vi}
                    </td>
                    <td
                      className="py-2 sm:py-3 px-2 sm:px-4 text-sm sm:text-xl md:text-3xl text-yellow-500 font-extrabold cursor-default"
                      title={new Date(row.updated_at).toLocaleString("vi-VN")}
                    >
                      {timeAgo(row.updated_at)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
