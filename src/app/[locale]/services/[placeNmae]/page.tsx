import Footer from "@/app/components/footer/Footer";
import Nav from "@/app/components/nav/Nav";
import PlaceData from "@/app/components/place/PlaceData";
import { useTranslations } from "next-intl";

export default function Page({ searchParams }: any) {
  const t = useTranslations("PlaceDetails");

  return (
    <>
      <Nav />
      <PlaceData
        params={searchParams}
        place={t("place")}
        sar={t("sar")}
        hour={t("hour")}
        book={t("book")}
        spaceName={t("book")}
        coffeeName={t("coffeeName")}
        event={t("event")}
        time={t("time")}
        date={t("date")}
        hours={t("hours")}
        people={t("people")}
        text={t("text")}
        continueBooking={t("continue")}
        from={t("from")}
        to={t("to")}
        am={t("am")}
        pm={t("pm")}
      />
      <Footer />
    </>
  );
}