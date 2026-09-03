import Image from "next/image";
import { withBasePath } from "@/lib/basePath";

interface PageHeaderProps {
  /** Path under /public, for example /images/headers/services.jpg */
  imageSrc: string;
}

/**
 * A decorative banner band for interior pages.
 *
 * The image carries no information the page does not already state in its heading, so it
 * takes an empty alt and is hidden from assistive technology, which is the correct
 * treatment for a purely decorative image. Deliberately no text is placed over the photo:
 * overlaying a heading on an arbitrary image cannot guarantee 4.5:1, and the page heading
 * reads better on the plain background anyway.
 */
export function PageHeader({ imageSrc }: PageHeaderProps) {
  return (
    <div className="relative h-32 w-full overflow-hidden border-b border-gov-border sm:h-44" aria-hidden="true">
      <Image src={withBasePath(imageSrc)} alt="" fill priority sizes="100vw" className="object-cover object-center" />
    </div>
  );
}
