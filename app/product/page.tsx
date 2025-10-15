import Header from "../components/Header";
import Footer from "../components/Footer";
import Slide from "../components/Slide";
import LightboxGallery from "../components/LightboxGallery";

const images = [
  "/img/1.jpeg",
  "/img/2.jpg",
  "/img/3.jpg",
  "/img/4.jpg",
  "/img/5.jpg",
  "/img/6.jpg",
  "/img/7.jpg",
  "/img/8.jpg",
  "/img/9.jpg",
  "/img/10.jpg",
  "/img/11.jpg",
  "/img/12.jpg",
  "/img/13.jpg",
  "/img/14.jpg",
  "/img/15.jpg",
];

export const metadata = {
  title: "Vàng Bạc Vân Anh - Hình ảnh Vàng Bạc Vân Anh - Sang trọng & Tinh tế",
  description:
    "Vàng Bạc Vân Anh cung cấp nhẫn, dây chuyền, vòng tay… chất lượng cao, uy tín .",
  openGraph: {
    title: "Hình ảnh Vàng Bạc Vân Anh - Sang trọng & Tinh tế",
    description: "Sản phẩm vàng bạc chất lượng cao, uy tín.",
    url: "https://vangbacvananh.com/product",
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
            Bộ sưu tập hình ảnh Vàng Bạc Vân Anh
          </h2>
          <p className="mb-8 text-gray-800 text-base md:text-lg">
            Nơi mỗi món vàng bạc đều mang trong mình sự tinh xảo và câu chuyện riêng về phong cách.
          </p>

          <LightboxGallery images={images} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
