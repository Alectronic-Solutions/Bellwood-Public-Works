import Image from "next/image";

interface PageHeaderProps {
  heading: string;
  intro?: string;
  imageSrc: string;
  imageAlt: string;
}

export function PageHeader({ heading, intro, imageSrc, imageAlt }: PageHeaderProps) {
  return (
    <div className="relative">
      <div className="relative h-48 w-full overflow-hidden sm:h-64">
        <Image src={imageSrc} alt={imageAlt} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gov-navy/70" aria-hidden="true" />
        <div className="relative mx-auto flex h-full max-w-6xl items-end px-4 pb-6 sm:px-6">
          <h1 className="text-4xl font-bold text-white">{heading}</h1>
        </div>
      </div>
      {intro && (
        <div className="mx-auto max-w-6xl px-4 pt-5 sm:px-6">
          <p className="max-w-2xl text-gov-slate">{intro}</p>
        </div>
      )}
    </div>
  );
}
