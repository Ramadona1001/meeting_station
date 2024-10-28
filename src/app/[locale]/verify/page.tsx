import Verify from "@/app/components/auth/Verify";
import { useTranslations } from "next-intl";

export default function Page({ searchParams }: any) {
  const t = useTranslations("Auth");

  return (
    <>
      <Verify
        verEmail={searchParams.email}
        check={t("check")}
        received={t("received")}
        otpCode={t("otpCode")}
        verification={t("verification")}
      />
    </>
  );
}
