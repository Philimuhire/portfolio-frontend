import { Card, CardContent } from "@/components/Card";
import { Button } from "@/components/Button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import type { Service } from "@/types/service";

interface ServiceCardProps {
  service: Service;
}

const iconMap: Record<string, string> = {
  "web": "fas fa-code",       
  "mobile": "fas fa-mobile-alt", 
  "design": "fas fa-pencil-ruler",
  "data": "fas fa-chart-bar",   
  "support": "fas fa-headset", 
  "graphic": "fas fa-paint-brush", 
};

export default function ServiceCard({ service }: ServiceCardProps) {
  const iconClass = iconMap[service.icon || "code"] || "fas fa-code";

  return (
    <Card className="bg-slate-50 p-8 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
      <CardContent className="p-0 text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-6">
          <i className={`${iconClass} text-2xl text-primary`}></i>
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-4">{service.title}</h3>
        <p className="text-slate-600 leading-relaxed mb-6">{service.description}</p>
        <Link href="/contact">
          <Button variant="ghost" className="text-primary font-semibold hover:text-primary/80 transition-colors duration-300">
            Learn More <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
