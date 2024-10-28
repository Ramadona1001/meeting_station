import Reset from "@/app/components/auth/Reset";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("Auth");
  return (
    <>
      <Reset
        remember={t("remember")}
        msg={t("msg")}
        otp={t("otp")}
        email={t("email")}
        continueResetPass={t("continue")}
        remembered={t("remembered")}
        login={t("login")}
      />
    </>
  );
}
