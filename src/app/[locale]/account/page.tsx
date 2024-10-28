import Account from "@/app/components/account/Account";
import Footer from "@/app/components/footer/Footer";
import Nav from "@/app/components/nav/Nav";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("Home");

  return (
    <>
      <Nav />
      <Account logout={t("logout")} account={t("account")} />
      <Footer />
    </>
  );
}
