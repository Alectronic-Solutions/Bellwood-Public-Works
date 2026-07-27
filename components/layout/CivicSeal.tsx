import { useId } from "react";

interface CivicSealProps {
  className?: string;
  variant?: "navy" | "white";
}

export function CivicSeal({ className, variant = "navy" }: CivicSealProps) {
  const uid = useId();
  const topArcId = `${uid}-seal-top-arc`;
  const bottomArcId = `${uid}-seal-bottom-arc`;
  const color = variant === "white" ? "#FFFFFF" : "#1B3A5C";

  return (
    <svg viewBox="0 0 100 100" role="img" aria-labelledby={`${uid}-title`} className={className}>
      <title id={`${uid}-title`}>Seal of the City of Bellwood, founded 1889</title>
      <circle cx="50" cy="50" r="47" fill="none" stroke={color} strokeWidth="3" />
      <circle cx="50" cy="50" r="39" fill="none" stroke={color} strokeWidth="1.5" />
      <path id={topArcId} d="M 15 50 A 35 35 0 0 1 85 50" fill="none" />
      <path id={bottomArcId} d="M 20 68 A 35 35 0 0 0 80 68" fill="none" />
      <text fontSize="8.5" fill={color} fontWeight="700" letterSpacing="1.5">
        <textPath href={`#${topArcId}`} startOffset="50%" textAnchor="middle">
          CITY OF BELLWOOD
        </textPath>
      </text>
      <text fontSize="7" fill={color} fontWeight="600" letterSpacing="1">
        <textPath href={`#${bottomArcId}`} startOffset="50%" textAnchor="middle">
          EST. 1889
        </textPath>
      </text>
      <g stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M50 34 L50 58" />
        <path d="M38 46 L62 46" />
        <path d="M40 58 L60 58 L57 66 L43 66 Z" fill={color} />
        <path d="M50 34 L44 40 M50 34 L56 40" />
      </g>
    </svg>
  );
}
