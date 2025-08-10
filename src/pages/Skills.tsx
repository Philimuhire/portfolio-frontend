import { useState, useEffect } from "react";
import api from "@/api";
import { Button } from "@/components/Button";
import SkillCard from "@/components/SkillCard";

interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'DataAnalytics'| 'SystemAdministration'| 'Tool' | 'SoftSkill';
  percentage: number;
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("Frontend");
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories = ["Frontend", "Backend", "DataAnalytics", "SystemAdministration", "Tool", "SoftSkill"];

  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get<Skill[]>("/api/skills"); 
        setSkills(response.data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch skills");
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const filteredSkills = skills.filter(skill => skill.category === activeCategory);

  const categoryLabels: Record<string, string> = {
    Frontend: "Frontend Development",
    Backend: "Backend Development",
    DataAnalytics: "Data Analytics",
    SystemAdministration: "System Administration",
    Tool: "Tools & Technologies",
    SoftSkill: "Soft Skills"
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Skills & Expertise</h1>
          <p className="text-xl text-slate-600">Technologies and tools I work with</p>
        </div>

        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => (
              <Button
                key={category}
                onClick={() => setActiveCategory(category)}
                variant={activeCategory === category ? "default" : "outline"}
                className={activeCategory === category ? "bg-primary text-white" : ""}
              >
                {categoryLabels[category]}
              </Button>
            ))}
          </div>
        </div>

        {loading && (
          <p className="text-center text-slate-600">Loading skills...</p>
        )}

        {error && (
          <p className="text-center text-red-600">Error: {error}</p>
        )}

        {!loading && !error && (
          <>
            <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
              {categoryLabels[activeCategory]}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSkills.map(skill => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>

            {filteredSkills.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-600">No skills found in this category.</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
