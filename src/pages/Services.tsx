import ServiceCard from "@/components/ServiceCard";
import { mockServices } from "@/data/mockservices";
import type { Service } from "@/types/service";
import { useEffect, useState } from "react";

export default function Services() {
  const [services, setServices] = useState<Service[] | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setServices(mockServices);
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  if (services === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-600">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Services</h1>
          <p className="text-xl text-slate-600">What I can do for you.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {services.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600">No services available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}
