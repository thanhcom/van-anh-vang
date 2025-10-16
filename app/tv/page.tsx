"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import styles from "./BangGiaVang.module.css";

interface BangGia {
  id: number;
  loai_vang: string;
  mua_vao: number;
  ban_ra: number;
}

export default function BangGiaVangCongNgoc() {
  const [data, setData] = useState<BangGia[]>([]);
  const [highlightId, setHighlightId] = useState<number | null>(null);
  const [today, setToday] = useState<string>("");

  useEffect(() => {
    // Cập nhật ngày tháng hiện tại theo định dạng dd/mm/yyyy
    const now = new Date();
    const formattedDate = now.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    setToday(formattedDate);

    // Lấy dữ liệu lần đầu, sắp xếp theo id
    const fetchData = async () => {
      const { data } = await supabase
        .from("bang_gia_vang")
        .select("*")
        .order("id", { ascending: true });

      if (data) setData(data);
    };

    fetchData();

    // Subscribe realtime
    const subscription = supabase
      .channel("realtime-bang-gia")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bang_gia_vang" },
        (payload) => {
          setData((current) => {
            let newData = [...current];
            const newItem = payload.new as BangGia;
            const oldItem = payload.old as BangGia;

            switch (payload.eventType) {
              case "INSERT":
                newData.push(newItem);
                setHighlightId(newItem.id);
                break;
              case "UPDATE":
                newData = current.map((item) =>
                  item.id === newItem.id ? newItem : item
                );
                setHighlightId(newItem.id);
                break;
              case "DELETE":
                newData = current.filter((item) => item.id !== oldItem.id);
                break;
            }

            newData.sort((a, b) => a.id - b.id);

            if (payload.eventType === "INSERT" || payload.eventType === "UPDATE") {
              setTimeout(() => setHighlightId(null), 1000);
            }

            return newData;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.companyName}>
            DOANH NGHIỆP VÀNG BẠC VÂN ANH
          </div>
          <div>ĐC: 38 & 42 Trần Hưng Đạo, Hải Dương</div>
          <div>ĐT: 0987.774.545</div>
          <div>ĐT: 07.08.40.9999</div>
          
        </div>
        <div className={styles.headerCenter}>
          <h1>BẢNG GIÁ VÀNG HÔM NAY</h1>
          <div className={styles.dateText}>Cập nhật ngày: {today}</div>
        </div>
      </header>

      {/* Bảng giá */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>LOẠI VÀNG</th>
            <th>GIÁ MUA</th>
            <th>GIÁ BÁN</th>
            <th>LIÊN HỆ</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={item.id}
              className={item.id === highlightId ? styles.highlightRow : ""}
            >
              <td className={styles.loaiVang}>{item.loai_vang}</td>
              <td>{item.mua_vao.toLocaleString()}</td>
              <td>{item.ban_ra.toLocaleString()}</td>

              {index === 0 && (
                <td className={styles.lienHe} rowSpan={data.length}>
                  <div className={styles.contactBox}>
                    <div>0987 774 545 </div>
                    <div>07.08.40.9999</div>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Chữ chạy */}
      <div className={styles.marquee}>
        <span>
          VÀNG BẠC VÂN ANH RẤT HÂN HẠNH ĐƯỢC PHỤC VỤ QUÝ KHÁCH - 📞 07.08.40.9999 - CHUYÊN KINH DOANH VÀNG - NHẪN CƯỚI TRANG SỨC CAO CẤP - CAM KẾT UY TÍN – CHẤT LƯỢNG
        </span>
      </div>
    </div>
  );
}
