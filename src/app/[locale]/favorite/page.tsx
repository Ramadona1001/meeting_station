import Fav from "@/app/components/fav-place/Fav";
import Footer from "@/app/components/footer/Footer";
import Nav from "@/app/components/nav/Nav";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("Home");

  return (
    <>
      <Nav />
      <Fav fav={t("fav")} sar={t("sar")} />
      <Footer />
    </>
  );
}
