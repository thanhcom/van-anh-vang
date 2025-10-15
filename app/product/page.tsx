import Header from "../components/Header";
import Footer from "../components/Footer";
import Slide from "../components/Slide";
import LightboxGallery from "../components/LightboxGallery";

const images = [
  "/img/1.jpeg",
  "/img/2.jpeg",
  "/img/3.jpeg",
  "/img/4.jpeg",
  "/img/5.jpeg",
  "/img/3.jpeg",
];

export const metadata = {
  title: "Vàng Bạc Công Ngọc - Hình ảnh Vàng Bạc Công Ngọc - Sang trọng & Tinh tế",
  description:
    "Vàng Bạc Công Ngọc cung cấp nhẫn, dây chuyền, vòng tay… chất lượng cao, uy tín .",
  openGraph: {
    title: "Hình ảnh Vàng Bạc Công Ngọc - Sang trọng & Tinh tế",
    description: "Sản phẩm vàng bạc chất lượng cao, uy tín.",
    url: "https://vangbaccongngoc.com/product",
    images: [
      {
        url: "/img/5.jpeg",
        width: 800,
        height: 600,
      },
    ],
  },
};

export default function GalleryPage() {
  return (
    <main className="fade-in-page">
      <Header />
      <Slide />

      <section className="py-12 md:py-16 bg-yellow-50">
        <div className="container mx-auto px-4 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-red-700 mb-8">
            Bộ sưu tập hình ảnh Vàng Bạc Công Ngọc
          </h2>
          <p className="mb-8 text-gray-800 text-base md:text-lg">
            Khám phá vẻ đẹp tinh tế và sang trọng của các sản phẩm vàng bạc tại cửa hàng chúng tôi.
          </p>

          <LightboxGallery images={images} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
