import Image from "next/image";
import Link from "next/link";
import Links from "./Links";
import { useTranslations } from "next-intl";
import Notifications from "./Notifications";
import Menu from "./Menu";
import Preloader from '../preloader/Preloader'


export default function Nav() {
  const t = useTranslations("Home");

  return (
    <>
    <Preloader/>
    <nav>
      <header className="bg-[#F7FCFC] shadow-md">
        <div className="container px-3 sm:px-0 py-7 mx-auto lg:w-[80%] flex items-center justify-between">
          <div className="logo flex items-center">
            <div className="relative w-20 sm:w-[120px]">
              <Link href="/" className="w-full">
                <Image src="/logo.png" alt="logo" width={80} height={50}/>
              </Link>
            </div>

            <Menu
              home={t("home")}
              services={t("services")}
              transaction={t("transaction")}
              about={t("about")}
              terms={t("terms")}
              myServices={t("myServices")}
              reservations={t("reservations")}
            />
          </div>
          <Links
            home={t("home")}
            services={t("services")}
            transaction={t("transaction")}
            about={t("about")}
            terms={t("terms")}
            myServices={t("myServices")}
            reservations={t("reservations")}
            />
          <Notifications login={t("login")} not={t("not")} />
        </div>
      </header>
    </nav>
    </>
  );
}
