import SignUp from "@/app/components/auth/SignUp";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("Auth");

  return (
    <>
      <SignUp
        newUser={t("new")}
        welcome={t("welcome")}
        first={t("first")}
        last={t("last")}
        email={t("email")}
        password={t("password")}
        rePassword={t("rePassword")}
        you={t("you")}
        foundation={t("foundation")}
        user={t("user")}
        login={t("login")}
        other={t("other")}
        have={t("have")}
      />
    </>
  );
}
