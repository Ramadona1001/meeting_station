import { useTranslations } from "next-intl";
import Image from "next/image";
import Group from "./Group";
import About_Msg from "./About_Msg";

export default function About() {
  const t = useTranslations("About");

  const data = [
    {
      img: "/prodution1.png",
      name: "productivity",
      des: "prodution1Des",
    },
    {
      img: "/prodution2.png",
      name: "focus",
      des: "prodution2Des",
    },
    {
      img: "/prodution3.png",
      name: "committed",
      des: "prodution3Des",
    },
  ];

  const groupData = [
    {
      img: "/Group1.png",
      name: "group1Name",
      des: "group1Des",
    },
    {
      img: "/Group2.png",
      name: "group2Name",
      des: "group2Des",
    },
    {
      img: "/Group3.png",
      name: "group3Name",
      des: "group3Des",
    },
    {
      img: "/Group4.png",
      name: "group4Name",
      des: "group4Des",
    },
    {
      img: "/Group5.png",
      name: "group5Name",
      des: "group5Des",
    },
    {
      img: "/Group6.png",
      name: "group6Name",
      des: "group6Des",
    },
  ];

  return (
    <section>
      <div className="bg-[url('/about.png')] bg-cover bg-center w-full h-60 bg-no-repeat relative flex items-center justify-center">
        <div className="overlay absolute top-0 left-0 w-full h-full bg-teal-600 opacity-20"></div>
        <div>
          <h3 className="text-white text-3xl font-inter font-bold relative z-50">
            {t("who")}
          </h3>
        </div>
      </div>
      <div className="container px-3 sm:px-0 mx-auto lg:w-[80%] mt-8">
        <div>
          <h5 className="text-sm text-gray-500 font-inter">{t("about")}</h5>
          <p className="text-xl font-bold font-inter py-2">{t("reserving")}</p>
        </div>
        <About_Msg />
        <div className="mt-20">
          <h3 className="text-sm text-teal-500 font-inter">{t("who")}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-10 gap-y-16 mt-14">
            {data.map((e, id) => (
              <div key={id} className="flex flex-col gap-3 items-center">
                <Image src={e.img} alt={e.name} width={40} height={40} />
                <h3 className="text-lg text-teal-600 font-bold font-inter">
                  {t(e.name)}
                </h3>
                <p className="text-sm opacity-70 left-7 font-inter text-center leading-6">
                  {t(e.des)}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-36">
          <h3 className="text-sm text-teal-500 font-inter">{t("why")}</h3>
          <Group />
        </div>
      </div>
    </section>
  );
}
