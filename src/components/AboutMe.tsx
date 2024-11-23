"use client";

import Dev from "@assets/images/dev.jpg";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

const cardVariants: Variants = {
  offscreen: {
    x: 200,
  },
  onscreen: {
    x: 0,
    transition: {
      type: "tween",
      duration: 0.8,
      ease: "easeIn",
    },
  },
};

const AboutMe = () => {
  return (
    <div className="grid grid-cols-2 pt-12">
      <div></div>
      <div className="flex flex-row items-center gap-1">
        <h1 className="text-2xl font-semibold">About Me</h1>
        <h1 className="text-4xl lg:text-4xl sm:text-6xl">👦🏻</h1>
      </div>
      <div className="col-start-1 flex items-center">
        <Image
          src={Dev}
          height={450}
          width={450}
          alt="dev_photo"
          className="rounded-md"
        />
      </div>
      <div className="flex flex-col justify-start pt-2">
        <motion.p
          initial="offscreen"
          whileInView="onscreen"
          variants={cardVariants}
        >
          I'm a passionate software engineer with a passion for creating
          innovative solutions specializing in building web applications,
          decentralized applications (dApps), testing them using various testing
          tools.I focus on delivering scalable and innovative solutions. My
          technical expertise includes a diverse range of programming languages
          such as Python, JavaScript, TypeScript and C++. I bring a strong work
          ethic and a collaborative mindset to every project, thriving in team
          settings that encourage diverse ideas and creative problem-solving. By
          staying abreast of emerging technologies and industry trends, I aim to
          continually refine my skills and contribute to forward-thinking
          solutions that align with excellence and innovation. I love
          collaborating with others and learning from their experiences.
        </motion.p>
      </div>
    </div>
  );
};

export default AboutMe;
