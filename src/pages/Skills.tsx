import { useState } from "react";
import { Button } from "@/components/Button";
import SkillCard from "@/components/SkillCard";
import { mockSkills } from "@/data/mockSkills";

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("Frontend");

  const categories = ["Frontend", "Backend", "Tool", "SoftSkill"];
  const filteredSkills = mockSkills.filter(skill => skill.category === activeCategory);

  const categoryLabels = {
    Frontend: "Frontend Development",
    Backend: "Backend Development",
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
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setActiveCategory(category)}
                variant={activeCategory === category ? "default" : "outline"}
                className={activeCategory === category ? "bg-primary text-white" : ""}
              >
                {categoryLabels[category as keyof typeof categoryLabels]}
              </Button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">
            {categoryLabels[activeCategory as keyof typeof categoryLabels]}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600">No skills found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
