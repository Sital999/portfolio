"use client";

import { ProjectLsit } from "@constants/projects";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
import Card from "./Card";

const Projects = () => {
  return (
    <div className="flex flex-col gap-10 items-center  py-20">
      <div className="flex flex-col gap-10">
        <div className="flex flex-row gap-4">
          <h1 className="text-4xl font-semibold">Projects And Contributions</h1>
          <h1 className="text-5xl lg:text-5xl sm:text-6xl">🧑🏻‍💻</h1>
        </div>
        <div className="flex flex-col gap-16 h-full">
          {ProjectLsit.map((project, index) => {
            return <Card key={index} project={project} index={index} />;
          })}
        </div>
      </div>
      <div className="flex flex-row gap-4 items-center">
        For more projects visit{" "}
        <Link href="https://github.com/Sital999" target="_blank">
          <FaGithub className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
};

export default Projects;
