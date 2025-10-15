"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

interface BangGia {
  id?: number;
  loai_vang: string;
  mua_vao: number;
  ban_ra: number;
  don_vi?: string;
  updated_at?: string;
}

// 🔹 Hàm tính "time ago"
function timeAgo(dateString: string) {
  const now = new Date();
  const past = new Date(dateString);
  const diff = (now.getTime() - past.getTime()) / 1000;

  if (diff < 60) return `${Math.floor(diff)} giây trước`;
  if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)} ngày trước`;
  if (diff < 31104000) return `${Math.floor(diff / 2592000)} tháng trước`;
  return `${Math.floor(diff / 31104000)} năm trước`;
}

export default function BangGiaVangManager() {
  useEffect(() => {
    document.title = "💎 Quản lý Bảng giá vàng - Vân Anh";
  }, []);

  const [rows, setRows] = useState<BangGia[]>([]);
  const [formData, setFormData] = useState<BangGia>({
    loai_vang: "",
    mua_vao: 0,
    ban_ra: 0,
    don_vi: "Nghìn VNĐ/chỉ",
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [, setTick] = useState(0);

  // 🔹 Load ban đầu + realtime
  useEffect(() => {
    loadData();

    const channel = supabase
      .channel("realtime-banggia")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bang_gia_vang" },
        (payload) => {
          if (payload.eventType === "INSERT" || payload.eventType === "DELETE") {
            loadData();
          }
          // ⛔ Không reload khi UPDATE — giữ nguyên thứ tự
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // 🔹 Tick để update timeAgo
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    const { data, error } = await supabase
      .from("bang_gia_vang")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("❌ Lỗi load dữ liệu:", error.message);
      alert("Không thể tải dữ liệu: " + error.message);
    } else {
      const withDonVi = (data || []).map((r) => ({
        ...r,
        don_vi: "Nghìn VNĐ/chỉ",
      }));
      setRows(withDonVi);
    }
  };

  // 🔹 Thêm / Cập nhật
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        const updatedAt = new Date().toISOString();
        const { error } = await supabase
          .from("bang_gia_vang")
          .update({
            loai_vang: formData.loai_vang,
            mua_vao: formData.mua_vao,
            ban_ra: formData.ban_ra,
            updated_at: updatedAt,
          })
          .eq("id", editingId);

        if (error) throw error;

        setRows((prev) =>
          prev.map((item) =>
            item.id === editingId
              ? { ...item, ...formData, updated_at: updatedAt }
              : item
          )
        );

        alert("✅ Cập nhật thành công!");
        setEditingId(null);
      } else {
        const updatedAt = new Date().toISOString();
        const { data, error } = await supabase
          .from("bang_gia_vang")
          .insert([
            {
              loai_vang: formData.loai_vang,
              mua_vao: formData.mua_vao,
              ban_ra: formData.ban_ra,
              updated_at: updatedAt,
            },
          ])
          .select();

        if (error) throw error;

        if (data && data.length > 0) {
          setRows((prev) => [
            ...prev,
            { ...data[0], don_vi: "Nghìn VNĐ/chỉ" },
          ]);
        }

        alert("✅ Thêm mới thành công!");
      }

      setFormData({
        loai_vang: "",
        mua_vao: 0,
        ban_ra: 0,
        don_vi: "Nghìn VNĐ/chỉ",
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("❌ Lỗi Supabase:", err.message);
        alert("❌ Lỗi khi lưu dữ liệu: " + err.message);
      } else {
        alert("❌ Có lỗi xảy ra, vui lòng thử lại.");
      }
    }
  };

  // 🔹 Sửa
  const handleEdit = (row: BangGia) => {
    setEditingId(row.id!);
    setFormData({ ...row });
  };

  // 🔹 Xóa
  const handleDelete = async (id: number) => {
    if (confirm("Bạn có chắc muốn xóa không?")) {
      const { error } = await supabase.from("bang_gia_vang").delete().eq("id", id);
      if (error) {
        console.error("❌ Lỗi xóa:", error.message);
        alert("Lỗi khi xóa: " + error.message);
      } else {
        setRows((prev) => prev.filter((r) => r.id !== id));
        alert("🗑️ Đã xóa thành công!");
      }
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-red-700 text-center">
        💎 Quản lý Bảng giá vàng - Vàng Bạc Vân Anh
      </h2>

      {/* ===== FORM ===== */}
      <form
        onSubmit={handleSubmit}
        className="bg-red-50 p-4 md:p-5 rounded-2xl shadow-lg border border-red-200 mb-6 space-y-3"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Loại vàng"
            value={formData.loai_vang}
            onChange={(e) =>
              setFormData({ ...formData, loai_vang: e.target.value })
            }
            required
            className="border border-red-300 p-2 rounded focus:ring-2 focus:ring-red-500 outline-none text-sm md:text-base"
          />
          <input
            type="number"
            placeholder="Mua vào"
            value={formData.mua_vao}
            onChange={(e) =>
              setFormData({ ...formData, mua_vao: Number(e.target.value) })
            }
            required
            className="border border-red-300 p-2 rounded focus:ring-2 focus:ring-red-500 outline-none text-sm md:text-base"
          />
          <input
            type="number"
            placeholder="Bán ra"
            value={formData.ban_ra}
            onChange={(e) =>
              setFormData({ ...formData, ban_ra: Number(e.target.value) })
            }
            required
            className="border border-red-300 p-2 rounded focus:ring-2 focus:ring-red-500 outline-none text-sm md:text-base"
          />
          <input
            type="text"
            placeholder="Đơn vị"
            value={formData.don_vi}
            onChange={(e) =>
              setFormData({ ...formData, don_vi: e.target.value })
            }
            className="border border-red-300 p-2 rounded focus:ring-2 focus:ring-red-500 outline-none text-sm md:text-base"
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 font-bold rounded-lg transition cursor-pointer text-sm md:text-base ${
            editingId
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white"
          }`}
        >
          {editingId ? "💾 Lưu cập nhật" : "➕ Thêm mới"}
        </button>
      </form>

      {/* ===== TABLE ===== */}
      <div className="overflow-x-auto shadow-lg rounded-xl border border-red-200">
        <table className="min-w-full text-center">
          <thead>
            <tr className="bg-gradient-to-r from-red-600 to-red-700 text-white text-sm md:text-base">
              <th className="py-2 px-2 md:px-4">Loại vàng</th>
              <th className="py-2 px-2 md:px-4">Mua vào</th>
              <th className="py-2 px-2 md:px-4">Bán ra</th>
              <th className="py-2 px-2 md:px-4">Cập nhật</th>
              <th className="py-2 px-2 md:px-4">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-white text-sm md:text-base">
            {rows.map((r) => (
              <tr
                key={r.id}
                className="border-b hover:bg-red-50 transition-colors"
              >
                <td className="py-1 md:py-2 px-2 md:px-4 font-semibold text-red-700">
                  {r.loai_vang}
                </td>
                <td className="py-1 md:py-2 px-2 md:px-4 text-gray-700">
                  {r.mua_vao.toLocaleString()} {r.don_vi}
                </td>
                <td className="py-1 md:py-2 px-2 md:px-4 text-gray-700">
                  {r.ban_ra.toLocaleString()} {r.don_vi}
                </td>
                <td className="py-1 md:py-2 px-2 md:px-4 text-yellow-500 font-semibold">
                  {r.updated_at ? timeAgo(r.updated_at) : "-"}
                </td>
                <td className="py-1 md:py-2 px-2 md:px-4 flex justify-center space-x-2">
                  <button
                    onClick={() => handleEdit(r)}
                    className="text-red-600 font-semibold cursor-pointer text-xs md:text-sm"
                  >
                    ✏️ Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(r.id!)}
                    className="text-gray-500 font-semibold cursor-pointer text-xs md:text-sm"
                  >
                    🗑️ Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
