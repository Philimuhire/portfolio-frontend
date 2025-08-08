import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent } from "@/components/Card";
import { Badge } from "@/components/Badge";
import type { Project } from "@/types/project";


interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
      <img 
        src={project.imageUrl || "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"} 
        alt={project.title}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-semibold text-slate-800">{project.title}</h3>
          <div className="flex gap-2">
            {project.githubLink && (
              <a 
                href={project.githubLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-primary transition-colors duration-300"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {project.liveLink && (
              <a 
                href={project.liveLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-primary transition-colors duration-300"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
        <p className="text-slate-600 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-500">
            {new Date(project.createdAt).toLocaleDateString()}
          </span>
          {project.liveLink && (
            <a 
              href={project.liveLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary font-semibold hover:text-primary/80 transition-colors duration-300"
            >
              <ExternalLink className="w-4 h-4 inline mr-2" />
              Live Demo
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
