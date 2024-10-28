import { useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa";
import Discount from "./Discount";
import Title from "./Title";

export default function Banner() {
  const t = useTranslations("Home");

  return (
    <section>
      <div className="container mt-10 mx-auto px-3 sm:px-0 lg:w-[80%]  relative py-5 rounded-lg ">
        <div className="bg-active">
          <Title favPlace={t("favPlace")} contact={t("contact")} />
        </div>
        <Discount
          discount={t("discount")}
          discountDay={t("discountDay")}
          book={t("book")}
          bookMSg={t("bookMSg")}
          contact={t("contact")}
        />
      </div>
    </section>
  );
}
