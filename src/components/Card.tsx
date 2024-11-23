import { IProject } from "@constants/projects";
import { cn } from "@lib/utils";
import { motion } from "framer-motion";
import { Link } from "lucide-react";
import Image from "next/image";
import AnchorLink from "next/link";
import { FaGithub } from "react-icons/fa";

const Card = ({ project, index }: { project: IProject; index: number }) => {
  return (
    <div
      className={cn(
        " w-full h-full flex items-start justify-start",
        index % 2 == 0 ? "flex-row" : "flex-row-reverse"
      )}
    >
      <motion.div
        viewport={{ once: true }}
        initial={{ x: index % 2 == 0 ? 100 : 0, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        whileInView={{ x: index % 2 == 0 ? 0 : 100, opacity: 1 }}
        className="flex flex-col gap-4 basis-1/2"
      >
        <h1 className="text-3xl font-semibold">{project.title}</h1>
        <div className="flex flex-row gap-4">
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
        viewport={{ once: true }}
        initial={{ x: index % 2 == 0 ? 0 : 100, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        whileInView={{ x: index % 2 == 0 ? 100 : 0, opacity: 1 }}
      >
        <Image
          className="h-80 w-full rounded-md"
          src={project.img}
          alt={project.title}
        />
      </motion.div>
    </div>
  );
};

export default Card;
