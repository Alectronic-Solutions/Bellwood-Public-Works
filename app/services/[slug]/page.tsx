import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { services } from "@/content/services";
import { ServiceDetail } from "@/components/services/ServiceDetail";

interface ServicePageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: ServicePageProps): Metadata {
  const service = services.find((item) => item.slug === params.slug);
  return { title: service ? service.name : "Service" };
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = services.find((item) => item.slug === params.slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetail service={service} />;
}
