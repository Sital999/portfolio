"use client";

import { INavBarBtn, navbarBtns } from "@constants/navBarBtns";
import { cn } from "@lib/utils";
import { themeAtom } from "@store/theme";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { MoonStarIcon } from "lucide-react";
import { Edu_NSW_ACT_Foundation } from "next/font/google";

const italicFont = Edu_NSW_ACT_Foundation({
  subsets: ["latin"],
  weight: "700",
});

const Header = () => {
  const [theme, setTheme] = useAtom(themeAtom);
  const handleThemeClick = () => {
    setTheme((prevTheme) => {
      localStorage.setItem("darkMode", !prevTheme.darkMode ? "true" : "false");
      return { ...prevTheme, darkMode: !prevTheme.darkMode };
    });
  };
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 5,
      }}
      className={cn("flex flex-row justify-between ")}
    >
      <h1 className={cn("font-semibold text-xl", italicFont.className)}>
        Developed By: SITAL
      </h1>
      <div className="flex gap-4">
        {navbarBtns.map((btn) => {
          return <NavBarButtons btn={btn} key={btn.title} />;
        })}
      </div>
      <MoonStarIcon
        onClick={handleThemeClick}
        className={cn(
          "h-6 cursor-pointer w-6 ",
          theme.darkMode
            ? "text-stone-50 fill-stone-50"
            : "text-stone-800 fill-stone-800"
        )}
      />
    </motion.div>
  );
};

export const NavBarButtons = ({ btn }: { btn: INavBarBtn }) => {
  const { title, link, soonCard } = btn;
  const handleClick = () => {
    if (!link) {
      return;
    }
    if (!link?.startsWith("/")) {
      window.location.hash = link;
    }
  };
  return (
    <div
      onClick={handleClick}
      className={cn(
        "text-lg font-medium cursor-pointer",
        soonCard && "relative"
      )}
    >
      {link?.startsWith("/") ? (
        <a href={link}>
          {title} {soonCard && <SoonCard />}
        </a>
      ) : (
        <>
          {title} {soonCard && <SoonCard />}
        </>
      )}
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
