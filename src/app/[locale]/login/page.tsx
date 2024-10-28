import Login from "@/app/components/auth/Login";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("Auth");

  return (
    <>
      <Login
        welcome={t("welcome")}
        email={t("email")}
        password={t("password")}
        login={t("login")}
        other={t("otherLogin")}
        have={t("have")}
        dont={t("dont")}
        createAccount={t("createAccount")}
        forget={t("forget")}
      />
    </>
  );
}
