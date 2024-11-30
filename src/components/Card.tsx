import { IProject } from "@constants/projects";
import { useIsMobile } from "@hooks/useIsMobile";
import { cn } from "@lib/utils";
import { themeAtom } from "@store/theme";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { Link } from "lucide-react";
import Image from "next/image";
import AnchorLink from "next/link";
import { FaGithub } from "react-icons/fa";

const Card = ({ project, index }: { project: IProject; index: number }) => {
  const isMobile = useIsMobile();
  const [theme] = useAtom(themeAtom);
  return (
    <div
      className={cn(
        " w-full h-full flex items-start justify-start gap-4 lg:gap-0",
        isMobile
          ? "flex-col-reverse"
          : index % 2 == 0
          ? "flex-row"
          : "flex-row-reverse"
      )}
    >
      <motion.div
        viewport={{ once: true }}
        initial={{ x: index % 2 == 0 ? 100 : 0, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        whileInView={{ x: isMobile ? 0 : index % 2 == 0 ? 0 : 100, opacity: 1 }}
        className="flex flex-col gap-2 md:gap-4 basis-1/2"
      >
        <h1 className="text-lg md:text-xl lg:text-3xl font-normal md:font-font-medium lg:font-semibold">
          {project.title}
        </h1>
        <div className="flex flex-row gap-4">
          {project.githubLink && (
            <AnchorLink href={project.githubLink} target="_blank">
              <FaGithub className="h-4 md:h-5 lg:h-6 w-4 md:w-5 lg:w-6" />
            </AnchorLink>
          )}
          {project.deployedLink && (
            <AnchorLink href={project.deployedLink} target="_blank">
              <Link className="h-4 md:h-5 lg:h-6 w-4 md:w-5 lg:w-6" />
            </AnchorLink>
          )}
        </div>
        <p
          className={cn(
            "text-sm md:text-base font-normal",
            theme.darkMode ? "theme-gray-300" : "text-gray-600"
          )}
        >
          {project.description}
        </p>
      </motion.div>
      <motion.div
        viewport={{ once: true }}
        initial={{ x: index % 2 == 0 ? 0 : 100, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        whileInView={{ x: isMobile ? 0 : index % 2 == 0 ? 100 : 0, opacity: 1 }}
      >
        <Image
          className=" h-60 md:h-72 lg:h-80 w-full rounded-md"
          src={project.img}
          alt={project.title}
        />
      </motion.div>
    </div>
  );
};

export default Card;
