type ConfigOptions = "white" | "default";
type ColorConfig = Record<
  ConfigOptions,
  { titleClasses: string; subtitleClasses: string }
>;

const base = {
  titleClasses: "leading-normal text-center text-[64px]",
  subtitleClasses: "text-xl font-inter mt-2 text-center",
};

const colorClasses: ColorConfig = {
  white: {
    titleClasses: base.titleClasses,
    subtitleClasses: base.subtitleClasses,
  },
  default: {
    titleClasses: `bg-gradient-text bg-clip-text text-transparent ${base.titleClasses}`,
    subtitleClasses: `opacity-60 ${base.subtitleClasses}`,
  },
};

export default function PageHeader({
  title,
  subtitle,
  color = "default",
}: {
  title: JSX.Element | string;
  subtitle: JSX.Element | string;
  color?: ConfigOptions;
}) {
  const { titleClasses, subtitleClasses } = colorClasses[color];
  return (
    <>
      <h1 className={titleClasses}>{title}</h1>
      <div className={subtitleClasses}>{subtitle}</div>
    </>
  );
}
