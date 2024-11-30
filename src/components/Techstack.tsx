"use client";

import CPP from "@assets/images/cpp.png";
import JS from "@assets/images/js.png";
import Python from "@assets/images/python.png";
import TS from "@assets/images/ts.png";
import { useIsMobile } from "@hooks/useIsMobile";
import { motion } from "framer-motion";
import Image from "next/image";

const techStacks = [Python, JS, TS, CPP];

const TechStack = () => {
  const isMobile = useIsMobile();
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="flex flex-row gap-4 items-center"
    >
      <h1 className="text-xl md:text-2xl font-semibold">Tech Stack :</h1>
      <div className="flex flex-row gap-6 items-center">
        {techStacks.map((tech, index) => {
          return (
            <Image
              key={index}
              src={tech}
              alt="Tech Stack"
              width={isMobile ? 25 : 35}
              height={isMobile ? 25 : 35}
            />
          );
        })}
      </div>
    </motion.div>
  );
};

export default TechStack;
