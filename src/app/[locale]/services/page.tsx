import AllServices from "@/app/components/allServices/AllServices";
import Footer from "@/app/components/footer/Footer";
import Nav from "@/app/components/nav/Nav";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("Home");

  return (
    <>
      <Nav />
      <AllServices
        services={t("services")}
        all={t("all")}
        hotel={t("hotel")}
        co={t("co")}
        meeting={t("meeting")}
        cafe={t("cafe")}
        bookNow={t("bookNow")}
        details={t("details")}
        more={t("more")}
      />
      <Footer/>
    </>
  );
}
