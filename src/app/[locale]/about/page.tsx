import About from "@/app/components/about/About";
import Footer from "@/app/components/footer/Footer";
import Nav from "@/app/components/nav/Nav";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("About");

  return (
    <>
      <Nav />
      <About />
      <Footer />
    </>
  );
}
