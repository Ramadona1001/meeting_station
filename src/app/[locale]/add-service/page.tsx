import AddService from "@/app/components/add-service/AddService";
import Footer from "@/app/components/footer/Footer";
import Nav from "@/app/components/nav/Nav";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("Services");
  return (
    <>
      <Nav />
      <AddService
        place={t("place")}
        description={t("description")}
        type={t("type")}
        coffee={t("coffee")}
        restaurant={t("restaurant")}
        hour={t("hour")}
        sar={t("sar")}
        people={t("people")}
        address={t("address")}
        newService={t("newService")}
        available={t("available")}
        photo={t("photo")}
        add={t("add")}
        dayWork={t("dayWork")}
        from={t("from")}
        to={t("to")}
        sat={t("sat")}
        sun={t("sun")}
        mon={t("mon")}
        tue={t("tue")}
        wed={t("wed")}
        thu={t("thu")}
        fri={t("fri")}
      />
      <Footer />
    </>
  );
}
