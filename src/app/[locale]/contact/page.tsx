import Contact from "@/app/components/contact/Contact";
import Footer from "@/app/components/footer/Footer";
import Nav from "@/app/components/nav/Nav";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("Contact");
  return (
    <>
      <Nav />
      <Contact
        contact={t("contact")}
        name={t("name")}
        email={t("email")}
        phone={t("phone")}
        msg={t("msg")}
        send={t("send")}
        team={t("team")}
      />
      <Footer />
    </>
  );
}
