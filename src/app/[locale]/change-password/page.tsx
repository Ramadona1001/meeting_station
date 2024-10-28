import ChangePass from "@/app/components/auth/ChangePass";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("Auth");
  return (
    <>
      <ChangePass
        reset={t("reset")}
        verPass={t("verPass")}
        password={t("password")}
        rePassword={t("rePassword")}
        save={t("save")}
      />
    </>
  );
}
