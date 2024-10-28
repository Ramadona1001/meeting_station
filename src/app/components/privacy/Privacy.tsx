import { useTranslations } from "next-intl";
import Term_Msg from "./Term_Msg";

export default function Privacy() {
  const t = useTranslations("Privacy");
  return (
    <section>
      <div className="bg-[url('/privacy.png')] bg-cover bg-center w-full h-60 bg-no-repeat relative flex items-center justify-center">
        <div className="overlay absolute top-0 left-0 w-full h-full bg-teal-600 opacity-20"></div>
        <div>
          <h3 className="text-white text-3xl font-inter font-bold relative z-50">
            {t("terms")}
          </h3>
        </div>
      </div>
      <div className="container px-3 sm:px-0 mx-auto lg:w-[80%] mt-10">
        <Term_Msg solution={t("solution")} />
      </div>
    </section>
  );
}
