import { useTranslations } from "next-intl";
import Image from "next/image";
import Group from "../../about/Group";

export default function Why() {
  const t = useTranslations("About");

  return (
    <section>
      <div className="container mx-auto mt-14 px-3 sm:px-0 lg:w-[80%]">
        <div className="flex items-center flex-col">
          <h3 className="text-3xl font-inter font-bold text-black text-center">
            {t("why")}
          </h3>
          <div className="flex w-[15%] justify-end mt-2">
            <Image src="/vector.png" alt="vector" width={70} height={70} />
          </div>
        </div>

        <Group />
      </div>
    </section>
  );
}
