import { useEffect, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/types/project";
import { mockProjects } from "@/data/mockProjects";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects(mockProjects);
  }, []);

  return (
    <section className="px-4 md:px-12 py-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-slate-800">My Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
