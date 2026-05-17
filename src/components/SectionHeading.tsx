interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

const SectionHeading = ({ eyebrow, title, subtitle, align = "center" }: Props) => (
  <div className={`max-w-2xl mb-12 ${align === "center" ? "mx-auto text-center" : ""}`}>
    {eyebrow && (
      <span className="inline-block px-3 py-1 rounded-full bg-accent text-primary text-xs font-semibold tracking-wider uppercase mb-4">
        {eyebrow}
      </span>
    )}
    <h2 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-secondary leading-tight">
      {title}
    </h2>
    {subtitle && <p className="mt-4 text-muted-foreground text-base md:text-lg">{subtitle}</p>}
  </div>
);

export default SectionHeading;
