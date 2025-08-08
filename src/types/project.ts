export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubLink?: string;
  liveLink?: string;
  imageUrl?: string;
  createdAt: string | Date;
}
