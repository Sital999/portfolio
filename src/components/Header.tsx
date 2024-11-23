"use client";

import { cn } from "@lib/utils";
import { MoonStarIcon } from "lucide-react";
import { Edu_NSW_ACT_Foundation } from "next/font/google";

const italicFont = Edu_NSW_ACT_Foundation({
  subsets: ["latin"],
  weight: "700",
});

interface INavBarBtn {
  title: string;
  link?: string;
  soonCard?: boolean;
}

const navbarBtns: Array<INavBarBtn> = [
  { title: "Home", link: "/", soonCard: false },
  { title: "About Me", link: "", soonCard: true },
  { title: "Contact", link: "", soonCard: true },
];

const Header = () => {
  return (
    <div className={cn("flex flex-row justify-between ")}>
      <h1 className={cn("font-semibold text-xl", italicFont.className)}>
        Developed By: SITAL
      </h1>
      <div className="flex gap-4">
        {navbarBtns.map((btn) => {
          return <NavBarButtons btn={btn} key={btn.title} />;
        })}
      </div>
      <MoonStarIcon className="h-6 cursor-pointer w-6 text-stone-800 fill-stone-800" />
    </div>
  );
};

const NavBarButtons = ({ btn }: { btn: INavBarBtn }) => {
  const { title, link, soonCard } = btn;
  return (
    <div
      className={cn(
        "text-lg font-medium cursor-pointer",
        soonCard && "relative"
      )}
    >
      {title} {soonCard && <SoonCard />}
    </div>
  );
};

const SoonCard = () => {
  return (
    <div className="absolute -top-2 -right-2 -z-10 p-1 bg-red-400 text-white text-[8px] rounded-lg w-fit leading-none">
      Soon
    </div>
  );
};

export default Header;
