export interface Skill {
  id: string;
  name: string;
  category: "Frontend" | "Backend" | "Tool" | "SoftSkill";
  proficiency: number;
}
