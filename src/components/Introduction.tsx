"use client";

import Profile from "@app/assets/images/profile.png";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import Image from "next/image";
import { BsDiscord } from "react-icons/bs";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Introduction = () => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="flex flex-row justify-between py-10"
    >
      <div className="basis-2/3 gap-5 flex flex-col items-start justify-center">
        <div className="text-black text-[80px] font-extrabold ">
          <h1>Hey, There</h1>
          <h1>I Am Sital.</h1>
        </div>
        <h1 className="text-lg font-normal text-gray-600">
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

const socialMedia = [
  { icon: FaSquareXTwitter, link: "https://twitter.com/NagarkotiShital" },
  { icon: FaGithub, link: "https://github.com/Sital999" },
  { icon: Mail, link: "mailto:sitalnagarkoti123@gmail.com" },
  {
    icon: FaLinkedin,
    link: "https://www.linkedin.com/in/sital-nagarkoti-b62409241/",
  },
  { icon: BsDiscord, link: "https://discordapp.com/users/514428982935158784" },
];

const SocialMedia = () => {
  return (
    <div className="flex flex-row gap-4">
      {socialMedia.map((sm, index) => {
        const IconComponent = sm.icon;
        return (
          <a href={sm.link} target="_blank" key={index}>
            <IconComponent className="h-6 w-6 text-stone-600" />
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
