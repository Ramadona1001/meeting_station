import Footer from "@/app/components/footer/Footer";
import MyServices from "@/app/components/my-services/MyServices";
import Nav from "@/app/components/nav/Nav";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("Services");

  return (
    <>
      <Nav />
      <MyServices
        addServices={t("addServices")}
        win={t("win")}
        noServices={t("noServices")}
        sar={t("sar")}
        edit={t("edit")}
        am={t("am")}
        pm={t("pm")}
      />
      <Footer />
    </>
  );
}
