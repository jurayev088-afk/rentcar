import Navbar from "@/src/components/Navbar";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <Header />
      <main className="flex-1 bg-[#f3f4f5]">{children}</main>
      <Footer />
    </>
  );
}