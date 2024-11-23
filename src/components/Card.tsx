import { IProject } from "@constants/projects";
import { cn } from "@lib/utils";
import { motion } from "framer-motion";
import { Link } from "lucide-react";
import Image from "next/image";
import AnchorLink from "next/link";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";

const Card = ({ project, index }: { project: IProject; index: number }) => {
  let cardSize = 220;
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(
    null
  );

  // Track scroll direction
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection("up");
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation variants for cards
  const cardVariants = {
    hidden: (index: number) => ({ y: 0, opacity: 0 }),
    visible: (index: number) => ({
      y: scrollDirection === "down" ? index * cardSize : index * cardSize,
      opacity: 1,
      transition: {
        duration: 1.4,
        delay: index * 0.4, // Stagger effect for each card
      },
    }),
  };

  return (
    <motion.div
      key={index}
      className={cn(
        "bg-stone-200 w-full absolute left-0 py-4 gap-10 rounded-lg flex flex-row items-start justify-start"
      )}
      custom={index}
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={cardVariants}
      whileInView={"visible"}
      style={{
        top: `${index * cardSize}px`,
      }}
    >
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        whileInView={{ x: scrollDirection === "down" ? 0 : 70, opacity: 1 }}
        className="flex flex-col gap-4 basis-1/2"
      >
        <h1 className="text-3xl font-semibold">{project.title}</h1>
        <div className="flex flex-row gap-2">
          {project.githubLink && (
            <AnchorLink href={project.githubLink} target="_blank">
              <FaGithub className="h-6 w-6" />
            </AnchorLink>
          )}
          {project.deployedLink && (
            <AnchorLink href={project.deployedLink} target="_blank">
              <Link className="h-6 w-6" />
            </AnchorLink>
          )}
        </div>
        <p className="text-md">{project.description}</p>
      </motion.div>
      <motion.div
        initial={{ x: 0, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        whileInView={{ x: scrollDirection === "down" ? 100 : 70, opacity: 1 }}
      >
        <Image
          className="h-80 w-[550px] rounded-md"
          src={project.img}
          alt={project.title}
        />
      </motion.div>
    </motion.div>
  );
};

export default Card;
