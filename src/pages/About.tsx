import { useEffect, useState } from "react";
import api from "@/api"; 
import type { Project } from "@/types/project";

export default function About() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get<Project[]>("/api/projects");
        setProjects(res.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">About Me</h1>
          <p className="text-xl text-slate-600">Bringing ideas to life through code, data, and technology systems.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Bringing ideas to life through code and data." 
              className="rounded-xl shadow-lg w-full" 
            />
          </div>
          <div className="space-y-6">
            <p className="text-lg text-slate-600 leading-relaxed">
              I am an IT professional with a strong passion for data, software development, and technology systems. Over the past 2+ years, I’ve built a foundation in creating reliable digital solutions, analyzing data for decision-making, and ensuring smooth IT operations
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              My journey started with a curiosity about how technology works, which grew into a drive to solve real-world problems using code, data, and systems thinking. I specialize in modern web technologies, backend development, and database management, while also working with data to transform complex information into actionable insights.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Beyond development and analysis, I enjoy improving IT processes, whether it’s optimizing workflows, ensuring data accuracy, or supporting system users to get the most out of their tools.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              I’m currently open to opportunities, freelance projects, and collaborations where I can contribute technical expertise, data-driven insights, and innovative solutions while continuing to grow alongside ambitious teams.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{loading ? "..." : `${projects.length}+`}</div>
                <div className="text-slate-600 font-medium">Projects Completed</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <div className="text-2xl font-bold text-primary">2+</div>
                <div className="text-slate-600 font-medium">Years Experience</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-check-circle text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Quality First</h3>
              <p className="text-slate-600">Dedicated to delivering reliable, efficient, and sustainable IT solutions through clean practices and attention to detail.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-bolt text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Innovation</h3>
              <p className="text-slate-600">Continuously exploring new technologies, data-driven insights, and creative approaches to build impactful solutions.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-users text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Collaboration</h3>
              <p className="text-slate-600">Believe in the power of teamwork, knowledge-sharing, and cross-functional collaboration to achieve greater outcomes.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
