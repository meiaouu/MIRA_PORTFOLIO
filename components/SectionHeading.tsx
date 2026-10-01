import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="mx-auto mb-16 max-w-2xl text-center">
      <span className="eyebrow font-mono">{eyebrow}</span>
      <h2 className="mt-4 font-pixel text-lg leading-relaxed text-white sm:text-xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-white/55">{description}</p>
      )}
    </Reveal>
  );
}
