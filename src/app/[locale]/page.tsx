import { useTranslations } from "next-intl";
import Nav from "../components/nav/Nav";
import Banner from "../components/home/banner/Banner";
import Services from "../components/home/serbices/Services";
import Why from "../components/home/why/Why";
import BestBook from "../components/home/best/BestBook";
import ContactUs from "../components/home/contact/ContactUs";
import Footer from "../components/footer/Footer";

export default function Home() {
  const t = useTranslations("Home");
  
  return (
    <>
      <Nav />
      <Banner />
      <Services
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
      <Why />
      <BestBook best={t("best")} sar={t("sar")} />
      <ContactUs
        contact={t("contact")}
        contactNum={t("contactNum")}
        address={t("address")}
        send={t("send")}
        email={t("email")}
      />
      <Footer />
    </>
  );
}
