import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import type { Project } from "@/types/project";
import api from "@/api";

export default function SingleProject() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await api.get<Project>(`/api/projects/${id}`);
        setProject(response.data);
      } catch (err) {
        setError("Failed to load project");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-center text-gray-500">Loading project...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-center text-red-500">{error || "Project not found"}</p>
        <Link to="/projects">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/projects">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </Link>

        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {project.imageUrl && (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          )}

          <div className="p-6 md:p-10">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800">
                {project.title}
              </h1>
              <div className="flex gap-3">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-primary transition-colors duration-300"
                    aria-label="View on GitHub"
                  >
                    <Github className="w-7 h-7" />
                  </a>
                )}
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-primary transition-colors duration-300"
                    aria-label="View live demo"
                  >
                    <ExternalLink className="w-7 h-7" />
                  </a>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6 text-slate-500">
              <time dateTime={new Date(project.createdAt).toISOString()}>
                {new Date(project.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-3">Description</h2>
              <p className="text-slate-700 text-lg leading-relaxed">{project.description}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-3">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, index) => (
                  <Badge key={index} variant="secondary" className="text-sm py-2 px-3">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {(project.githubLink || project.liveLink) && (
              <div className="flex flex-wrap gap-4 pt-6 border-t border-slate-200">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                    </Button>
                  </a>
                )}
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-primary text-white hover:bg-primary/90">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                  </a>
                )}
              </div>
            )}
          </div>
        </article>

        <div className="mt-8 flex justify-center">
          <Link to="/projects">
            <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
              View More Projects
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
