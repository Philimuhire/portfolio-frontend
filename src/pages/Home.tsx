import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/Button";
import ProjectCard from "@/components/ProjectCard";
import BlogCard from "@/components/BlogCard";
import type { Project } from "@/types/project";
import type { Blog } from "@/types/blog";
import api from "@/api"; 

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, blogsRes] = await Promise.all([
          api.get<Project[]>("/api/projects"),
          api.get<Blog[]>("/api/blogs"),
        ]);
        setProjects(projectsRes.data);
        setBlogs(blogsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <section className="min-h-screen flex items-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mb-6">
                Hi, I'm <span className="text-primary">Philbert Muhire</span>
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                A Data Analyst and Software Developer who loves working with data and building softwares. 
                I turn raw information into useful insights and create tools that help solve real-world problems. 
                My work combines analytical thinking with technical skills to make a real impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/projects">
                  <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
                    View My Work
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white">
                    Get In Touch
                  </Button>
                </Link>
              </div>
              <div className="flex space-x-6 mt-8">
                <a href="https://github.com/Philimuhire" target="_blank" className="text-slate-600 hover:text-primary text-2xl transition-colors duration-300">
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/philbert-muhire-182b96195/" target="_blank" className="text-slate-600 hover:text-primary text-2xl transition-colors duration-300">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://x.com/PhilbertMuhire2" target="_blank" className="text-slate-600 hover:text-primary text-2xl transition-colors duration-300">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="mailto:philimuhire@gmail.com" target="_blank" className="text-slate-600 hover:text-primary text-2xl transition-colors duration-300">
                  <i className="fas fa-envelope"></i>
                </a>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img 
                src="/images/profile.jpg" 
                alt="Philbert Muhire - Data analyst - Full Stack Developer" 
                className="rounded-2xl shadow-2xl animate-float w-full max-w-md" 
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="text-3xl font-bold text-primary mb-2">{projects.length}+</div>
              <div className="text-slate-600">Projects Completed</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-primary mb-2">2+</div>
              <div className="text-slate-600">Years Experience</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-primary mb-2">10+</div>
              <div className="text-slate-600">Technologies</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-primary mb-2">{blogs.length}+</div>
              <div className="text-slate-600">Blog Posts</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Featured Projects</h2>
            <p className="text-xl text-slate-600">Some of the work I'm proud of</p>
          </div>

          {loading ? (
            <p className="text-center">Loading projects...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/projects">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
                View All Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Latest Blog Posts</h2>
            <p className="text-xl text-slate-600">Sharing knowledge and insights from my development journey</p>
          </div>

          {loading ? (
            <p className="text-center">Loading blogs...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <BlogCard 
                  key={blog.id} 
                  blog={blog} 
                  reactionCount={24} 
                  commentCount={8} 
                />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/blogs">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
                View All Posts
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}