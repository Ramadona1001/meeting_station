import Edit from "@/app/components/edit-services/Edit";
import Footer from "@/app/components/footer/Footer";
import Nav from "@/app/components/nav/Nav";
import { useTranslations } from "next-intl";

export default function Page({searchParams} : any) {

  const t = useTranslations("Services")


  return (
    <>
      <Nav />
      <Edit
        data={searchParams}
        update={t("update")}
        Place={t("place")}
        description={t("description")}
        hour={t("hour")}
        from={t("from")}
        to={t("to")}
        save={t("save")}
        addressN={t("address")}
        numberOfPeople={t("people")}
        dayWork={t("dayWork")}
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
