import Edit_Account from "@/app/components/edit-account/Edit";
import Nav from "@/app/components/nav/Nav";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("Account");

  return (
    <>
      <Nav />
      <Edit_Account
        edit={t("edit")}
        email={t("email")}
        name={t("name")}
        phone={t("phone")}
        country={t("country")}
        photo={t("photo")}
        save={t("save")}
        error={t("error")}
      />
    </>
  );
}
