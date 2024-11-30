"use client";

import Profile from "@assets/images/profile.png";
import { socialMedia } from "@constants/socialMedia";
import { cn } from "@lib/utils";
import { themeAtom } from "@store/theme";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import Image from "next/image";

const Introduction = () => {
  const [theme] = useAtom(themeAtom);
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="flex flex-col-reverse lg:flex-row justify-between py-3 md:py-5 lg:py-10 gap-2 md:gap-0"
    >
      <div className="basis-2/3 gap-5 flex flex-col items-center md:items-start justify-center">
        <div className="flex flex-row gap-2 md:block text-3xl md:text-6xl lg:text-[80px] font-extrabold ">
          <h1>Hey, There</h1>
          <h1>I Am Sital.</h1>
        </div>
        <h1
          className={cn(
            "text-sm md:text-lg font-normal ",
            theme.darkMode ? "theme-gray-300" : "text-gray-600"
          )}
        >
          Welcome to my tranquil place! I'm Sital Nagarkoti, A passionate
          Software Developer. Currently on a mission to transform awesome ideas
          into seamless digital design.
        </h1>
        <SocialMedia />
      </div>
      <ProfileSection />
    </motion.div>
  );
};

const SocialMedia = () => {
  const [theme] = useAtom(themeAtom);

  return (
    <div className="flex flex-row gap-4">
      {socialMedia.map((sm, index) => {
        const IconComponent = sm.icon;
        return (
          <a href={sm.link} target="_blank" key={index}>
            <IconComponent
              className={cn(
                "h-6 w-6 ",
                theme.darkMode ? "text-stone-300" : "text-stone-600"
              )}
            />
          </a>
        );
      })}
    </div>
  );
};

const ProfileSection = () => {
  return (
    <div className="relative">
      <div
        className="rounded-full h-80 w-72 bg-radial-gradient -z-10
         blur-sm absolute  left-[30%] drop-shadow-2xl "
      ></div>
      <Image height={800} src={Profile} alt="Profile Image" className="z-10" />
    </div>
  );
};
export default Introduction;
