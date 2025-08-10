export interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'DataAnalytics'| 'SystemAdministration'| 'Tool' | 'SoftSkill';
  percentage: number;
}
