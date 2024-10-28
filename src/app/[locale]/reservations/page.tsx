import Footer from "@/app/components/footer/Footer";
import Nav from "@/app/components/nav/Nav";
import Reservations from "@/app/components/reservations/Reservations";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("Reservations");
  return (
    <>
      <Nav />
      <Reservations
        newBook={t("new")}
        pre={t("pre")}
        rej={t("rej")}
        today={t("today")}
        approval={t("approval")}
        refusal={t("refusal")}
        am={t("am")}
        pm={t("pm")}
        not={t("not")}
      />
      <Footer />
    </>
  );
}
