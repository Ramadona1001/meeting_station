import BookDetails from "@/app/components/book-details/BookDetails";
import Footer from "@/app/components/footer/Footer";
import Nav from "@/app/components/nav/Nav";
import { useTranslations } from "next-intl";

export default function Page({ searchParams }: any) {
  const t = useTranslations("PlaceDetails");

  return (
    <>
      <Nav />
      <BookDetails
        data={searchParams}
        edit={t("edit")}
        sar={t("sar")}
        pay={t("pay")}
        details={t("details")}
        rate={t("rate")}
      />
      <Footer />
    </>
  );
}
