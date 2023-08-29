type ConfigOptions = "white" | "default";
type ColorConfig = Record<
  ConfigOptions,
  { titleClasses: string; subtitleClasses: string }
>;

const base = {
  titleClasses: "leading-normal text-center text-[64px]",
  subtitleClasses: "text-xl font-inter mt-2 text-center opacity-60 leading-10",
};

const colorClasses: ColorConfig = {
  white: {
    titleClasses: base.titleClasses,
    subtitleClasses: base.subtitleClasses,
  },
  default: {
    titleClasses: `bg-gradient-text bg-clip-text text-transparent ${base.titleClasses}`,
    subtitleClasses: base.subtitleClasses,
  },
};

export default function PageHeader({
  title,
  subtitle,
  color = "default",
  titleClasses: titleOverrides = "",
  subtitleClasses: subOverrides = "",
}: {
  title: JSX.Element | string;
  subtitle?: JSX.Element | string;
  color?: ConfigOptions;
  subtitleClasses?: string;
  titleClasses?: string;
}) {
  const { titleClasses, subtitleClasses } = colorClasses[color];
  return (
    <>
      <h1 className={`${titleClasses} ${titleOverrides}`}>{title}</h1>
      {subtitle && (
        <div className={`${subtitleClasses} ${subOverrides}`}>{subtitle}</div>
      )}
    </>
  );
}
