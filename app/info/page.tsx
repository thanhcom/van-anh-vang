import Header from "../components/Header";
import Footer from "../components/Footer";
import Slide from "../components/Slide";

export const metadata = {
  title: "Vàng Bạc Công Ngọc - Niềm tin và chất lượng",
  description:
    "Vàng Bạc Công Ngọc cung cấp nhẫn, dây chuyền, vòng tay… chất lượng cao, uy tín .",
  openGraph: {
    title: "Thông tin Vàng Bạc Công Ngọc",
    description: "Sản phẩm vàng bạc chất lượng cao, uy tín.",
    url: "https://vangbacvananh.com/info",
    images: [
      {
        url: "/img/5.jpeg",
        width: 800,
        height: 600,
      },
    ],
  },
};

export default function InfoPage() {
  return (
    <main className="fade-in-page">
      <Header />
      <Slide />

      {/* Nội dung chính */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-red-50 to-yellow-50">
        <div className="container mx-auto px-4 md:px-12 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold text-red-700 mb-8 text-center md:text-left drop-shadow-[0_0_6px_rgba(255,100,100,0.3)]">
            Thông tin về Vàng Bạc Vân Anh
          </h2>

          <p className="mb-6 text-gray-800 text-base md:text-lg leading-relaxed">
            💎 <strong>Vàng Bạc Vân Anh</strong> là địa chỉ uy tín hàng đầu
            trong lĩnh vực vàng bạc – đá quý tại Hải Dương. Với nhiều năm kinh
            nghiệm, chúng tôi tự hào mang đến cho quý khách hàng những sản phẩm
            tinh xảo, đẳng cấp và chất lượng vượt trội.
          </p>

          <p className="mb-6 text-gray-800 text-base md:text-lg leading-relaxed">
            🌟 Tại <strong>Vàng Bạc Vân Anh</strong>, mỗi sản phẩm không chỉ là
            món trang sức mà còn là biểu tượng của phong cách và giá trị. Chúng
            tôi cung cấp đa dạng mẫu mã như nhẫn, dây chuyền, vòng tay, bông
            tai… được chế tác từ vàng, bạc và đá quý cao cấp.
          </p>

          <p className="mb-6 text-gray-800 text-base md:text-lg leading-relaxed">
            🏆 Mỗi tác phẩm đều được chế tạo tỉ mỉ bởi đội ngũ thợ kim hoàn lành
            nghề, đảm bảo sự tinh tế trong từng chi tiết – mang đến cho bạn trải
            nghiệm sang trọng, khác biệt và đáng nhớ.
          </p>

          <p className="mb-6 text-gray-800 text-base md:text-lg leading-relaxed">
            📍 <strong>Địa chỉ cửa hàng:</strong> 42 Trần Hưng Đạo, Hải Dương
            <br />
            📞 <strong>Hotline:</strong> 07.08.40.9999
            <br />
            🕒 <strong>Giờ mở cửa:</strong> 8:00 – 20:00 mỗi ngày
          </p>

          {/* Bản đồ */}
          <div className="mb-8 w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-xl ring-2 ring-red-200">
            <iframe
              title="Bản đồ Vàng Bạc Vân Anh"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.4644098584993!2d106.32534807596356!3d20.938574090631692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31358b8e07e7d63d%3A0x8cf0f0e8c432c77!2zNDIgVHLhuqduIEjGsG5nIMSQ4bqhdSwgSOG6o2kgRMawxqFuZywgSOG6o2kgRMawxqFuZywgSOG6o2kgRMawxqFuZw!5e0!3m2!1svi!2s!4v1760493850089!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <p className="mb-6 text-gray-800 text-base md:text-lg leading-relaxed">
            ❤️ <strong>Vàng Bạc Vân Anh</strong> luôn đặt uy tín và sự hài lòng
            của khách hàng lên hàng đầu. Chúng tôi tin rằng, mỗi sản phẩm được
            lựa chọn từ Vân Anh sẽ là một kỷ vật quý giá, lưu giữ khoảnh khắc
            đáng nhớ trong cuộc sống của bạn.
          </p>

          <p className="text-gray-800 text-base md:text-lg leading-relaxed font-semibold">
            💖 Hãy đến và cảm nhận vẻ đẹp tinh tế, sang trọng và đẳng cấp của{" "}
            <span className="text-red-600 font-bold">Vàng Bạc Vân Anh</span>{" "}
            ngay hôm nay!
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
