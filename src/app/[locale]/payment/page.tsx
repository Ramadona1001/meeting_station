import Footer from "@/app/components/footer/Footer";
import Nav from "@/app/components/nav/Nav";
import Pay from "@/app/components/payment/Pay";
import { useTranslations } from "next-intl";

export default function Page({ searchParams }: any) {
  const t = useTranslations("Payment");

  return (
    <>
      <Nav />
      <Pay
        data={searchParams}
        pay={t("pay")}
        choose={t("choose")}
        card={t("card")}
        name={t("name")}
        cardNumber={t("cardNumber")}
        expiration={t("expiration")}
        cvvCode={t("cvvCode")}
        total={t("total")}
        sar={t("sar")}
        payNow={t("payNow")}
        fatoora={t("fatoora")}
        go={t("go")}
      />
      <Footer/>
    </>
  );
}
