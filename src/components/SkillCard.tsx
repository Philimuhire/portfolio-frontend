import { Card, CardContent } from "@/components/Card";
import type { Skill } from "@/types/skill";
import { Progress } from "@/components/Progress";

interface SkillCardProps {
  skill: Skill;
}

const getProficiencyColor = (value: number) => {
  if (value >= 90) return "bg-purple-500";
  if (value >= 75) return "bg-green-500";
  if (value >= 50) return "bg-yellow-500";
  return "bg-blue-500";
};

export default function SkillCard({ skill }: SkillCardProps) {
  const colorClass = getProficiencyColor(skill.proficiency);
  const textColor = colorClass.replace("bg-", "text-");
  const fadedColor = `${colorClass}/10`;

  return (
    <Card className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
      <CardContent className="p-0">
        <div className="flex items-center mb-4">
          <div className={`w-12 h-12 ${fadedColor} rounded-lg flex items-center justify-center mr-4`}>
            <span className={`text-2xl font-bold ${textColor}`}>
              {skill.name.charAt(0)}
            </span>
          </div>
          <div className="text-left">
            <h4 className="font-semibold text-slate-800 mb-2">{skill.name}</h4>
            <span className="text-sm text-green-600 font-medium">
              {skill.proficiency}%
            </span>
          </div>
        </div>

        <Progress value={skill.proficiency} className={`h-2 ${colorClass}`} />

        <p className="text-sm text-slate-600 mt-2">
          {skill.category} • {skill.proficiency}% proficiency
        </p>
      </CardContent>
    </Card>
  );
}
